import { Request, Response } from "express";
import PinModel from "../models/pin.model";

// Create a Pin
export const createPin = async (req: Request, res: Response) => {
  try {
    const newPin = new PinModel(req.body);
    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Pins
export const getAllPins = async (req: Request, res: Response) => {
  try {
    const pins = await PinModel.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Pin
export const deletePin = async (req: Request, res: Response) => {
  try {
    await PinModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Pin has been Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};
