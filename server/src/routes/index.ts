import { Router, IRouter } from "express";
import pinRoutes from "./api/pin.routes";
import authRoutes from "./api/auth.routes";
import userRoutes from "./api/user.routes";

const router: IRouter = Router();

// Auth
router.use("/auth", authRoutes);

// Pin
router.use("/pins", pinRoutes);

// Users
router.use("/users", userRoutes);

export default router;
