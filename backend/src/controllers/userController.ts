import { Request, Response } from "express";
import User from "../models/User";
import upload from "../services/userService";
import * as jwt from "jsonwebtoken";

import * as bcrypt from "bcryptjs";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log("The data has been uploaded successfully");
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      console.log("User not found");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Error fetching user");
    console.log("Error fetching user");
  }
};


export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  upload.single("profileImage")(req, res, async (err: any) => {
    if (err) {
      return res.status(500).send("Error uploading file");
    }

    const { firstName, lastName, username, email, phone, password, role } =
      req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Generated hash:", hashedPassword);

      const profileImage = req.file ? "/uploads/" + req.file.filename : "";

      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        phone,
        password: hashedPassword,
        role,
        profileImage,
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id, username: newUser.username, role: newUser.role },
        process.env.SECRET_KEY as string,
        { expiresIn: "1h" }
      );

      res.status(201).json({ user: newUser, token }); 
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user");
    }
  });
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName, phone, profileImage } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, phone, profileImage },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).send("User not found");
      console.log("User not found");
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Error updating user");
    console.log("Error updating user");
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).send("User not found");
      console.log("User not found");
    }
    res.status(200).json({ message: "User deleted" });
    console.log("User deleted");
  } catch (error) {
    res.status(500).send("Error deleting user");
    console.log("Error deleting user");
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  console.log("loginUser");

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
      return;
    }

 
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (isMatch == false) {
      console.log("Type of entered password:", password);
      console.log("Type of stored password:", user.password);

      res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.SECRET_KEY as string,
      { expiresIn: "1h" }
    );


    res.status(200).json({ user, token });
  } catch (error) {
    console.error("שגיאה בתהליך ההתחברות:", error);
    res.status(500).json({ message: "שגיאה בשרת" });
  }
};
