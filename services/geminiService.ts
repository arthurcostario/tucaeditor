import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function editImageWithAi(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Fix: Updated response parsing to robustly find the image data by iterating through content parts, as per image generation guidelines.
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
    }
    
    throw new Error("No image data returned from API.");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to process image with AI. The model may not have been able to fulfill the request.");
  }
}
