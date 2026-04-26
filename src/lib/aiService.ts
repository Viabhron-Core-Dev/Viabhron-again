import { getApiKey } from './apiKeys';
import { ProviderId } from './apiKeys';
import { GoogleGenAI } from '@google/genai';

export interface StreamCallbacks {
  onChunk: (text: string) => void;
  onComplete: (fullText: string) => void;
  onError: (error: string) => void;
}

export const streamAiResponse = async (
  providerId: ProviderId,
  model: string,
  messages: { role: 'user' | 'assistant'; content: string }[],
  callbacks: StreamCallbacks
) => {
  const apiKey = await getApiKey(providerId);

  if (!apiKey) {
    callbacks.onError('API Key missing. Please add it in Settings.');
    return;
  }

  try {
    if (providerId === 'gemini') {
      const ai = new GoogleGenAI({ apiKey });
      
      const contents = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        parts: [{ text: m.content }]
      }));

      const stream = await ai.models.generateContentStream({
        model,
        contents,
      });

      let fullText = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullText += chunkText;
          callbacks.onChunk(fullText);
        }
      }
      callbacks.onComplete(fullText);
    } else if (providerId === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true
        })
      });

      if (!response.ok) throw new Error(`OpenAI error: ${response.statusText}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            const message = line.replace(/^data: /, '');
            if (message === '[DONE]') break;
            try {
              const parsed = JSON.parse(message);
              const content = parsed.choices[0].delta?.content || '';
              fullText += content;
              callbacks.onChunk(fullText);
            } catch (e) {
              console.error('Error parsing OpenAI stream chunk', e);
            }
          }
        }
      }
      callbacks.onComplete(fullText);
    } else if (providerId === 'claude') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 4096,
          stream: true
        })
      });

      if (!response.ok) throw new Error(`Claude error: ${response.statusText}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            const message = line.replace(/^data: /, '');
            try {
              const parsed = JSON.parse(message);
              if (parsed.type === 'content_block_delta') {
                fullText += parsed.delta.text;
                callbacks.onChunk(fullText);
              }
            } catch (e) {
              // Ignore partial parse errors
            }
          }
        }
      }
      callbacks.onComplete(fullText);
    }
  } catch (error: any) {
    callbacks.onError(error.message || 'An unexpected error occurred during API call.');
  }
};
