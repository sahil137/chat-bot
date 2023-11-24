import express from "express";
import { getAllMessages, sendMessage } from "../controller/chat-controller.js";

const router = express.Router();

router.get("/chat", sendMessage);
router.get("/get-messages", getAllMessages);

export default router;
