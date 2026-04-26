import { Preferences } from '@capacitor/preferences';

export type ProviderId = 'gemini' | 'claude' | 'openai';

export interface ApiKeyConfig {
  providerId: ProviderId;
  customName?: string;
  status: 'untested' | 'valid' | 'invalid';
  lastTested?: number;
}

const STORAGE_KEY_PREFIX = 'vaa_ai_key_';
const CONFIG_KEY = 'vaa_ai_configs';

export const saveApiKey = async (providerId: ProviderId, key: string) => {
  await Preferences.set({
    key: `${STORAGE_KEY_PREFIX}${providerId}`,
    value: key,
  });
};

export const getApiKey = async (providerId: ProviderId): Promise<string | null> => {
  const { value } = await Preferences.get({
    key: `${STORAGE_KEY_PREFIX}${providerId}`,
  });
  return value;
};

export const removeApiKey = async (providerId: ProviderId) => {
  await Preferences.remove({
    key: `${STORAGE_KEY_PREFIX}${providerId}`,
  });
};

export const saveConfigs = async (configs: ApiKeyConfig[]) => {
  await Preferences.set({
    key: CONFIG_KEY,
    value: JSON.stringify(configs),
  });
};

export const getConfigs = async (): Promise<ApiKeyConfig[]> => {
  const { value } = await Preferences.get({
    key: CONFIG_KEY,
  });
  if (!value) return [
    { providerId: 'gemini', status: 'untested' },
    { providerId: 'claude', status: 'untested' },
    { providerId: 'openai', status: 'untested' },
  ];
  return JSON.parse(value);
};

export const testConnection = async (providerId: ProviderId, key: string): Promise<boolean> => {
  try {
    if (providerId === 'gemini') {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      return resp.ok;
    }
    if (providerId === 'openai') {
      const resp = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      return resp.ok;
    }
    if (providerId === 'claude') {
      // Anthropic usually needs a full request or a specific endpoint for testing. 
      // Often doesn't have a simple 'get models' without heavy headers.
      // We'll try a dummy message request if we can, or just check the key format if limited.
      // But let's try a GET to models if it exists (it doesn't usually in the same way).
      // Actually, we'll try to reach the messages endpoint with an empty request to see if it rejects with 401 or something else.
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
           model: "claude-3-haiku-20240307",
           max_tokens: 1,
           messages: [{ role: "user", content: "ping" }]
        })
      });
      // 200 or some specific error that implies auth success but bad payload is fine for a pin.
      // But we just want to know if the key is valid.
      return resp.status === 200;
    }
    return false;
  } catch (e) {
    console.error(`Connection test failed for ${providerId}`, e);
    return false;
  }
};
