/* SIDELINED — restore after JNI session
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
        // System.loadLibrary("vii_llama") // JNI library
    }

    @PluginMethod
    fun transform(call: PluginCall) {
        call.reject("OfflineAI is currently sidelined")
    }

    @PluginMethod
    fun testLoad(call: PluginCall) {
        call.reject("OfflineAI is currently sidelined")
    }

    @PluginMethod
    fun getStatus(call: PluginCall) {
        val ret = JSObject()
        ret.put("loaded", false)
        ret.put("sidelined", true)
        call.resolve(ret)
    }

    private fun unloadModel() {
    }

    private fun resetIdleTimer() {
    }
}
*/
