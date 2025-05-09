import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import db from "../db";
import { usersTable } from "../db/schema";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await db.select().from(usersTable);
    console.log("Getting all users from the database: ", users);

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(id)));
    console.log("Getting user by id from the database: ", user);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Missing required fields" });
    }

    await db
      .update(usersTable)
      .set({ name, email, password })
      .where(eq(usersTable.id, Number(id)));

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.delete(usersTable).where(eq(usersTable.id, Number(id)));

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { deleteUser, getAllUser, getUserById, updateUser };

