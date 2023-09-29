import { Request, Response } from "express";
import UserModel from "../models/user.model";

// Get a User By ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user: any = await UserModel.findById(req.params.id);
    const { password, ...otherDetails } = user._doc;

    res.status(200).json(otherDetails);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All User
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    const resultedUsers = await Promise.all(
      users.map((user: any) => {
        const { password, ...otherDetails } = user._doc;
        return otherDetails;
      })
    );

    res.status(200).json(resultedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a User By ID
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted Successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};
