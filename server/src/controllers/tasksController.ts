import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import db from "../db";
import { tasksTable } from "../db/schema";
import { CreateTask } from "../model/util";

const getAllTask = async (req: Request, res: Response) => {
  try {
    const tasks = await db.select().from(tasksTable);
    console.log("Getting all tasks from the database: ", tasks);

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, Number(id)));
    console.log("Getting task by id from the database: ", task);

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, Number(id)));
    console.log("Deleting task from the database: ", task);

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await db
      .update(tasksTable)
      .set(req.body)
      .where(eq(tasksTable.id, Number(id)));
    console.log("Updating task from the database: ", task);

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, userId }: CreateTask = req.body;

    if (!title || !description || !priority) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const task = await db
      .insert(tasksTable)
      .values({ userId, title, description, priority });
    console.log("Creating task in the database: ", task);
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return; 
  }
};

export { getAllTask, getTaskById, deleteTask, updateTask, createTask };
