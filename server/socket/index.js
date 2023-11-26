import { processMessage } from "../config/openai.js";
import Message from "../models/message-model.js";

export async function socketConnection(socket) {
  socket.on("chat", async (data) => {
    await Message.create({
      text: data.message,
      sentByServer: false,
    });
    const messages = await Message.find();
    const openaiRes = await processMessage(messages);
    console.log("sdsadas", openaiRes);
    await Message.create({
      text: openaiRes[0].message?.content,
      sentByServer: true,
    });
    socket.emit("chat", { message: openaiRes[0].message.content });
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
}
