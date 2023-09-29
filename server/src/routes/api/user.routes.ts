import { IRouter, Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../../controllers/user.controller";

const userRoutes: IRouter = Router();

// Get a User By ID
userRoutes.get("/:id", getUserById);

// Get All Users
userRoutes.get("/", getAllUsers);

// Delete a User By ID
userRoutes.delete("/:id", deleteUserById);

export default userRoutes;
