import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { JWT_SEC, PEPPER, SALT_ROUNDS } from "../config";
import jwt from "jsonwebtoken";

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const pepper = PEPPER as string;
    const saltRounds = parseInt(SALT_ROUNDS as string);
    const salt = bcrypt.genSaltSync(saltRounds);

    const passwordDigest = bcrypt.hashSync(
      `${req.body.password}${pepper}`,
      salt
    );

    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: passwordDigest,
    });

    const savedUser: any = await newUser.save();

    const { password, ...otherDetails } = savedUser._doc;
    res.status(201).json(otherDetails);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const user: any = await UserModel.findOne({
      email: { $eq: req.body.email },
    });
    console.log(user);

    !user && res.status(404).json("User Not Found!");

    const pepper = PEPPER as string;
    const isPasswordValid = bcrypt.compareSync(
      `${req.body.password}${pepper}`,
      user.password
    );

    !isPasswordValid && res.status(401).json("Password is Wrong!");

    const jwtSec = JWT_SEC as string;
    const accessToken = jwt.sign(
      { username: user.username, email: user.email },
      jwtSec
    );

    const { password, ...otherDetails } = user._doc;

    res.status(200).json({ ...otherDetails, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
