import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function translateText(text: string, targetLanguage: string = "English"): Promise<string> {
  if (!text || !process.env.GEMINI_API_KEY) return text;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Translate the following text to ${targetLanguage}. Return ONLY the translated text, no explanations: "${text}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Linguistic Bridge Error:", error);
    return text;
  }
}
