
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MOCK_SOLUTIONS, MOCK_PROJECTS } from '../constants';

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for "Bouygues Shape the Future", an infrastructure portfolio website.
Your role is to help users find solutions, learn about projects, and understand the company's initiatives.

Here is the context of our current database:
Solutions: ${JSON.stringify(MOCK_SOLUTIONS.map(s => ({ title: s.title, desc: s.description, domain: s.domain })))}
Projects: ${JSON.stringify(MOCK_PROJECTS.map(p => ({ title: p.title, location: p.location, desc: p.description })))}

Rules:
1. Be professional, concise, and helpful.
2. If suggesting a solution, provide its exact title.
3. If you don't know the answer, politely suggest contacting the sales team.
4. Keep answers under 100 words unless asked for detail.
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "I'm sorry, I cannot connect to the AI service at the moment (Missing API Key).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-3-flash-preview for quick, efficient chat responses
    const chat: Chat = ai.chats.create({ 
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      },
      history: history
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "";

  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, but I'm having trouble processing your request right now.";
  }
};