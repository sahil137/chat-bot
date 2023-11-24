import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const processMessage = async (message) => {
  try {
    const res = await openAi.chat.completions.create({
      messages: [{ role: "system", content: message }],
      model: "gpt-3.5-turbo",
    });
    return res.choices;
  } catch (error) {
    console.error("OpenAI Error", error);
  }
};
