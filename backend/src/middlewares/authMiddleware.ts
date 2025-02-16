//אימות משתמשים עם JWT
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const secretKey = process.env.JWT_SECRET || "default_secret";
        const decoded = jwt.verify(token, secretKey);
        (req as any).user = decoded; 
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
};
