import express from "express";
import { getAllChats, sendMessage } from "../controller/chat-controller.js";

const router = express.Router();

router.get("/chat", sendMessage);
router.get("/get-chats", getAllChats);

export default router;
