import Message from "../models/message-model.js";

export const getAllMessages = async (req, res) => {
  try {
    const chatHistory = await Message.find();
    return res.status(200).json({ chatHistory });
  } catch (error) {
    return res.status(500).json({ error: "Error in getting messages" });
  }
};
export const sendMessage = async (req, res) => {};
