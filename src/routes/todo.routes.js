import express from "express";
import { createTask } from "../controllers/todo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { readTask } from "../controllers/todo.controller.js";
import { updateTask } from "../controllers/todo.controller.js";
import { deleteTask } from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, readTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);


export default router;