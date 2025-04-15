// Packages
import { Router } from "express";

// Services
import {
  createTask,
  getAllTasks,
  getTask,
  getUserTasks,
  updateTask,
} from "../services/tasks";

const router = Router();

router.post("/new", async (req, res) => {
  const { title, description, status, categoryId, flagId, userId } = req.body;
  try {
    const task = await createTask({
      title,
      description,
      status,
      categoryId,
      flagId,
      userId,
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create task" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to get tasks" });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await getUserTasks(userId);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to get tasks" });
  }
});

router.get("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await getTask(taskId);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to get tasks" });
  }
});

router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, categoryId, flagId } = req.body;
  try {
    const task = await updateTask(taskId, {
      title,
      description,
      status,
      categoryId,
      flagId,
    });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update task" });
  }
});

export default router;
