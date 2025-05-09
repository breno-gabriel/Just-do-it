import { Router } from "express";
import {
    deleteUser,
    getAllUser,
    getUserById,
    updateUser,
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.get("/", authenticateToken, getAllUser);
userRouter.get("/:id", authenticateToken, getUserById);
userRouter.put("/updateUser/:id", authenticateToken, updateUser);
userRouter.delete("/deleteUser/:id", authenticateToken, deleteUser);

export { userRouter };

