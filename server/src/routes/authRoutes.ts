import { Router } from "express";
import { login, signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

export { authRouter };

