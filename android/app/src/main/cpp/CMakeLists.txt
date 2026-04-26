cmake_minimum_required(VERSION 3.22.1)

project(llama_jni)

set(CMAKE_CXX_STANDARD 17)

# Enable Neon for ARM64
if(${ANDROID_ABI} STREQUAL "arm64-v8a")
    add_definitions(-DGGML_NEON=ON)
endif()

# Fetch llama.cpp
include(FetchContent)
FetchContent_Declare(
  llamacpp
  GIT_REPOSITORY https://github.com/ggerganov/llama.cpp.git
  GIT_TAG        master
)
FetchContent_MakeAvailable(llamacpp)

# Add our JNI library
add_library(llama SHARED
        llama-jni.cpp
)

# Include directories
target_include_directories(llama PRIVATE
        ${llamacpp_SOURCE_DIR}
        ${llamacpp_SOURCE_DIR}/include
        ${llamacpp_SOURCE_DIR}/common
)

# Link against llama.cpp and system libraries
# llama.cpp build produces 'llama' target
target_link_libraries(llama
        llama
        android
        log
)
