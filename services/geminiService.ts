import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateHealthAdvice = async (aqi: number, trendDataSummary: string) => {
  const client = getClient();
  if (!client) throw new Error("API Key not found");

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      contents: `Chỉ số AQI hiện tại là ${aqi}. Tóm tắt xu hướng gần đây: ${trendDataSummary}. Hãy đưa ra lời khuyên sức khỏe cho người dân Hà Nội hôm nay và nhận xét ngắn về xu hướng.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating health advice:", error);
    throw error;
  }
};
