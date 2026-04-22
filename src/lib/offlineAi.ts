/**
 * Capacitor Plugin interface for llama.cpp JNI bindings.
 * Reference: SmolChat-Android llama.cpp implementation.
 */
export interface OfflineAiPlugin {
  /**
   * Transforms text based on a specific instruction using the offline model.
   * @param options { text: string, instruction: string }
   * @returns { Promise<{ result: string }> }
   */
  transform(options: { text: string; instruction: string }): Promise<{ result: string }>;
  
  /**
   * Internal model lifecycle: 
   * 1. Lazy load on first transform call.
   * 2. Unload after 2 minutes of idle time.
   */
  getStatus(): Promise<{ loaded: boolean; lastActivity: number }>;
}

import { registerPlugin } from '@capacitor/core';

const OfflineAi = registerPlugin<OfflineAiPlugin>('OfflineAi');

export default OfflineAi;

/**
 * High-level helper for Vaa to use the offline AI.
 */
export async function transformTextOffline(text: string, instruction: string): Promise<string> {
  try {
    const { result } = await OfflineAi.transform({ text, instruction });
    return result;
  } catch (error) {
    console.error("Offline AI Error:", error);
    return text; // Fallback to original text on error
  }
}
