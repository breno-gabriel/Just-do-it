import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from "../controllers/tasksController";

const taskRouter = Router();

taskRouter.post("/createTask", authenticateToken, createTask);
taskRouter.get("/", authenticateToken, getAllTask);
taskRouter.get("/:id", authenticateToken, getTaskById);
taskRouter.put("/updateTask", authenticateToken, updateTask);
taskRouter.delete("/deleteTask",authenticateToken, deleteTask);

export { taskRouter };
