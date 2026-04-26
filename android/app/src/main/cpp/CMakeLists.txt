cmake_minimum_required(VERSION 3.22.1)

project(llama_jni)

set(CMAKE_CXX_STANDARD 17)

# Enable Neon for ARM64
if(${ANDROID_ABI} STREQUAL "arm64-v8a")
    add_definitions(-DGGML_NEON=ON)
endif()

# Fetch llama.cpp
include(FetchContent)
set(LLAMA_BUILD_EXAMPLES OFF CACHE BOOL "llama: build examples" FORCE)
set(LLAMA_BUILD_TESTS OFF CACHE BOOL "llama: build tests" FORCE)
set(LLAMA_BUILD_SERVER OFF CACHE BOOL "llama: build server" FORCE)

FetchContent_Declare(
  llamacpp
  GIT_REPOSITORY https://github.com/ggerganov/llama.cpp.git
  GIT_TAG        b4788
  GIT_SHALLOW    TRUE
)
FetchContent_MakeAvailable(llamacpp)

# Add our JNI library
add_library(vii_llama SHARED
        llama-jni.cpp
)

# Include directories
target_include_directories(vii_llama PRIVATE
        ${llamacpp_SOURCE_DIR}
        ${llamacpp_SOURCE_DIR}/include
        ${llamacpp_SOURCE_DIR}/common
)

# Link against llama.cpp and system libraries
# llama.cpp build produces 'llama' target
target_link_libraries(vii_llama
        llama
        android
        log
)
