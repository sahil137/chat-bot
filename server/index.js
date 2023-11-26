import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/mongoose.js";
import http from "http";
import { Server } from "socket.io";
import route from "./routes/index.routes.js";
import cors from "cors";
import { socketConnection } from "./socket/index.js";

dotenv.config();

const app = express();

// connect to mongodb
dbConnection();
app.use(express.json({ limit: "30mb" }));
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", socketConnection);

app.use("/", route);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`server running at Port: ${PORT}`);
});
