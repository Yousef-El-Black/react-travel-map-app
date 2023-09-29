import { Router, IRouter } from "express";
import {
  createPin,
  getAllPins,
  deletePin,
} from "../../controllers/pin.controller";

const pinRoutes: IRouter = Router();

// Create a Pin
pinRoutes.post("/", createPin);

// Get All Pins
pinRoutes.get("/", getAllPins);

// Delete Pin
pinRoutes.delete("/:id", deletePin);

export default pinRoutes;
