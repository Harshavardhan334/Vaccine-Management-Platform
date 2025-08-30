import express from "express";
import { getChatbotContext, processQuestion } from "../Controllers/Chatbot.js";

const router = express.Router();

// Get chatbot context (diseases and vaccines data)
router.get("/context", getChatbotContext);

// Process user question
router.post("/ask", processQuestion);

export default router;

