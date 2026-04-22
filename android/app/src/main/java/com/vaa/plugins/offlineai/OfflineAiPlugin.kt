package com.vaa.plugins.offlineai

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import android.os.Handler
import android.os.Looper

@CapacitorPlugin(name = "OfflineAi")
class OfflineAiPlugin : Plugin() {
    
    private var modelHandle: Long = 0
    private var lastActivity: Long = 0
    private val idleTimeout = 2 * 60 * 1000L // 2 minutes
    private val handler = Handler(Looper.getMainLooper())
    
    private val unloadRunnable = Runnable {
        unloadModel()
    }

    private external fun nativeLoadModel(path: String): Long
    private external fun nativeUnloadModel(handle: Long)
    private external fun nativeTransform(handle: Long, text: String, instruction: String): String

    init {
        System.loadLibrary("llama") // JNI library
    }

    @PluginMethod
    fun transform(call: PluginCall) {
        val text = call.getString("text") ?: ""
        val instruction = call.getString("instruction") ?: ""
        
        lastActivity = System.currentTimeMillis()
        resetIdleTimer()

        // Lazy load
        if (modelHandle == 0L) {
            val modelPath = getContext().filesDir.absolutePath + "/model.gguf"
            modelHandle = nativeLoadModel(modelPath)
        }

        if (modelHandle == 0L) {
            call.reject("Failed to load model")
            return
        }

        val result = nativeTransform(modelHandle, text, instruction)
        
        val ret = JSObject()
        ret.put("result", result)
        call.resolve(ret)
    }

    @PluginMethod
    fun getStatus(call: PluginCall) {
        val ret = JSObject()
        ret.put("loaded", modelHandle != 0L)
        ret.put("lastActivity", lastActivity)
        call.resolve(ret)
    }

    private fun unloadModel() {
        if (modelHandle != 0L) {
            nativeUnloadModel(modelHandle)
            modelHandle = 0L
        }
    }

    private fun resetIdleTimer() {
        handler.removeCallbacks(unloadRunnable)
        handler.postDelayed(unloadRunnable, idleTimeout)
    }
}
