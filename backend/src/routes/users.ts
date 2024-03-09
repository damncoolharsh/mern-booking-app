import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with length more then 6 is required").isLength({
      min: 6,
    }),
  ],
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: request.body.email,
      });
      if (user) {
        return response.status(400).json({ message: "User already exist" });
      }

      user = new User(request.body);
      await user.save();

      const token = jwt.sign(
        { userID: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      response.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        maxAge: 86400000,
      });
      return response.status(200).json({ message: "Register success" });
    } catch (err) {
      console.log(err);
      response.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
