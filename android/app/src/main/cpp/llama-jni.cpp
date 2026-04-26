#include <jni.h>
#include <string>
#include <vector>
#include <cmath>
#include <random>
#include <android/log.h>
#include "llama.h"

#define TAG "OfflineAiNative"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, TAG, __VA_ARGS__)

struct ModelHandle {
    llama_model* model;
    llama_context* ctx;
};

extern "C" {

JNIEXPORT jlong JNICALL
Java_com_vaa_plugins_offlineai_OfflineAiPlugin_nativeLoadModel(
        JNIEnv* env, jobject thiz, jstring path) {
    const char* model_path = env->GetStringUTFChars(path, nullptr);
    LOGI("Loading model from %s", model_path);

    llama_backend_init();

    llama_model_params model_params = llama_model_default_params();
    // Prefer mmap if possible
    model_params.use_mmap = true;
    
    llama_model* model = llama_load_model_from_file(model_path, model_params);

    if (!model) {
        LOGE("Failed to load model from %s", model_path);
        env->ReleaseStringUTFChars(path, model_path);
        return 0;
    }

    llama_context_params ctx_params = llama_context_default_params();
    ctx_params.n_ctx = 2048; 
    ctx_params.n_threads = 4; // Typical for mobile efficiency

    llama_context* ctx = llama_new_context_with_model(model, ctx_params);
    if (!ctx) {
        LOGE("Failed to create context");
        llama_free_model(model);
        env->ReleaseStringUTFChars(path, model_path);
        return 0;
    }

    ModelHandle* handle = new ModelHandle();
    handle->model = model;
    handle->ctx = ctx;

    env->ReleaseStringUTFChars(path, model_path);
    LOGI("Model loaded successfully. Handle: %p", handle);
    return reinterpret_cast<jlong>(handle);
}

JNIEXPORT void JNICALL
Java_com_vaa_plugins_offlineai_OfflineAiPlugin_nativeUnloadModel(
        JNIEnv* env, jobject thiz, jlong handle_ptr) {
    if (handle_ptr == 0) return;
    ModelHandle* handle = reinterpret_cast<ModelHandle*>(handle_ptr);
    if (handle->ctx) llama_free(handle->ctx);
    if (handle->model) llama_free_model(handle->model);
    delete handle;
    llama_backend_free();
    LOGI("Model unloaded");
}

// Helper to tokenize
std::vector<llama_token> tokenize(const llama_model* model, const std::string& text, bool add_bos) {
    int n_tokens = text.length() + 3;
    std::vector<llama_token> result(n_tokens);
    n_tokens = llama_tokenize(model, text.c_str(), text.length(), result.data(), result.size(), add_bos, true);
    if (n_tokens < 0) {
        result.resize(-n_tokens);
        int check = llama_tokenize(model, text.c_str(), text.length(), result.data(), result.size(), add_bos, true);
        if (check < 0) return {};
        n_tokens = check;
    }
    result.resize(n_tokens);
    return result;
}

// Helper to convert token to string
std::string token_to_piece(const llama_context* ctx, llama_token token) {
    std::vector<char> result(32);
    const int n_tokens = llama_token_to_piece(llama_get_model(ctx), token, result.data(), result.size(), 0, true);
    if (n_tokens < 0) {
        result.resize(-n_tokens);
        int check = llama_token_to_piece(llama_get_model(ctx), token, result.data(), result.size(), 0, true);
        if (check < 0) return "";
        return std::string(result.data(), check);
    }
    return std::string(result.data(), n_tokens);
}

JNIEXPORT jstring JNICALL
Java_com_vaa_plugins_offlineai_OfflineAiPlugin_nativeTransform(
        JNIEnv* env, jobject thiz, jlong handle_ptr, jstring text, jstring instruction) {
    if (handle_ptr == 0) return env->NewStringUTF("Error: Model handle is null");

    ModelHandle* handle = reinterpret_cast<ModelHandle*>(handle_ptr);
    const char* c_text = env->GetStringUTFChars(text, nullptr);
    const char* c_instruction = env->GetStringUTFChars(instruction, nullptr);

    // Prompt format: [INST] {instruction} \n\n Text: {text} [/INST]
    std::string prompt = "[INST] " + std::string(c_instruction) + "\n\nText: " + std::string(c_text) + " [/INST]";
    
    env->ReleaseStringUTFChars(text, c_text);
    env->ReleaseStringUTFChars(instruction, c_instruction);

    auto tokens = tokenize(handle->model, prompt, true);
    if (tokens.empty()) return env->NewStringUTF("Error: Tokenization failed");

    llama_batch batch = llama_batch_init(512, 0, 1);
    for (size_t i = 0; i < tokens.size(); ++i) {
        batch.token[batch.n_tokens] = tokens[i];
        batch.pos[batch.n_tokens] = i;
        batch.n_seq_id[batch.n_tokens] = 1;
        batch.seq_id[batch.n_tokens][0] = 0;
        batch.logits[batch.n_tokens] = (i == tokens.size() - 1);
        batch.n_tokens++;
    }

    if (llama_decode(handle->ctx, batch) != 0) {
        llama_batch_free(batch);
        return env->NewStringUTF("Error: llama_decode failed");
    }

    std::string response = "";
    int n_cur = tokens.size();
    int n_decode = 0;
    const int max_tokens = 512;
    const float temp = 0.7f;

    std::mt19937 gen(1337); // Fixed seed for reproducible test, or use random_device

    while (n_decode < max_tokens) {
        auto n_vocab = llama_n_vocab(handle->model);
        auto* logits = llama_get_logits_ith(handle->ctx, batch.n_tokens - 1);

        // Temperature Sampling (T=0.7)
        std::vector<float> probs(n_vocab);
        float max_logit = -1e9f;
        for (int i = 0; i < n_vocab; ++i) if (logits[i] > max_logit) max_logit = logits[i];
        
        double sum = 0.0;
        for (int i = 0; i < n_vocab; ++i) {
            probs[i] = exp((logits[i] - max_logit) / temp);
            sum += probs[i];
        }

        std::uniform_real_distribution<double> dist(0.0, sum);
        double r = dist(gen);
        llama_token id = n_vocab - 1;
        for (int i = 0; i < n_vocab; ++i) {
            r -= probs[i];
            if (r <= 0) {
                id = i;
                break;
            }
        }

        if (id == llama_token_eos(handle->model)) break;

        response += token_to_piece(handle->ctx, id);

        // Prepare next batch
        batch.n_tokens = 0;
        batch.token[batch.n_tokens] = id;
        batch.pos[batch.n_tokens] = n_cur;
        batch.n_seq_id[batch.n_tokens] = 1;
        batch.seq_id[batch.n_tokens][0] = 0;
        batch.logits[batch.n_tokens] = true;
        batch.n_tokens++;

        if (llama_decode(handle->ctx, batch) != 0) break;

        n_cur++;
        n_decode++;
    }

    llama_batch_free(batch);
    return env->NewStringUTF(response.c_str());
}

}
