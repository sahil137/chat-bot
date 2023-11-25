import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const processMessage = async (messages) => {
  try {
    const allMessages = messages.map((message) => ({
      role: message.sentByServer ? "assistant" : "user",
      content: message.text,
    }));
    const res = await openAi.chat.completions.create({
      messages: allMessages,
      model: "gpt-3.5-turbo",
    });
    return res.choices;
  } catch (error) {
    console.error("OpenAI Error", error);
  }
};
