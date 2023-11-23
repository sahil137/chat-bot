import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/mongoose.js";
import http from "http";
import { Server } from "socket.io";
import route from "./routes/index.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("User Connected");

  //   socket.on("disconnect", () => {
  //     console.log("User Disconnected");
  //   });
});
// connect to mongodb
dbConnection();

app.use("/", route);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

//3Nxa8WHmDKdQiE2d
