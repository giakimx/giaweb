import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PORTFOLIO_CONTENT } from '../constants';

// Construct the system instruction based on the portfolio content
const SYSTEM_INSTRUCTION = `
You are an AI assistant for ${PORTFOLIO_CONTENT.personal.name}. 
Your goal is to answer questions about Gia's experience, skills, and background based STRICTLY on the following context.
Be professional, concise, and helpful. Speak in the first person as if you are representing Gia's digital avatar.

Context:
Name: ${PORTFOLIO_CONTENT.personal.name}
Title: ${PORTFOLIO_CONTENT.personal.title}
Summary: ${PORTFOLIO_CONTENT.personal.summary}

Experience:
${PORTFOLIO_CONTENT.experience.map(job => 
  `- ${job.role} at ${job.company} (${job.period}): ${job.bullets.join(' ')}`
).join('\n')}

Socials:
${PORTFOLIO_CONTENT.socials.map(s => `${s.platform}: ${s.url}`).join(', ')}

Skills: ${PORTFOLIO_CONTENT.strengths.map(cat => `${cat.title}: ${cat.items.join(', ')}`).join('; ')}
Tools: ${PORTFOLIO_CONTENT.tools.map(cat => `${cat.title}: ${cat.items.join(', ')}`).join('; ')}
`;

let chatSession: Chat | null = null;

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const initializeChat = (): Chat | null => {
  const ai = getAiClient();
  if (!ai) return null;

  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Attempt to re-initialize if null
    chatSession = initializeChat();
    if (!chatSession) {
      return "I'm sorry, I can't connect to the AI service right now. Please check if the API Key is configured.";
    }
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I didn't catch that, could you rephrase?";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
};