import { Router, IRouter } from "express";
import { login, register } from "../../controllers/auth.controller";

// Auth Routes
const authRoutes: IRouter = Router();

// Register
authRoutes.post("/register", register);

// Login
authRoutes.post("/login", login);

export default authRoutes;
