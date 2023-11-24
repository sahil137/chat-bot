import Message from "../models/message-model";

export async function socketConnection(socket) {
  console.log("User Connected");
  console.log("cokertdsadsa", socket);
  socket.on("chat", async (data) => {
    console.log(data);
    const res = await Message.create({
      text: data.message,
      sentByServer: false,
    });
    // const data =
    // socket.emit("chat", "Message recieved");
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
}
