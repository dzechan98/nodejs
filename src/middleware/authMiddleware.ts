import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User, { IUser } from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
      const user = await User.findById(decoded.id).select("-passwordHash");
      if (!user) {
        res.status(401).json({ message: "Not authorized, user not found" });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles) {
      res.status(403).json({ message: "User has no roles assigned" });
      return;
    }
    const userRoles = req.user.roles as string[];
    if (!roles.some((role) => userRoles.includes(role))) {
      res.status(403).json({
        message: `User role(s) '${userRoles.join(
          ", "
        )}' is not authorized to access this route. Required roles: ${roles.join(
          ", "
        )}`,
      });
      return;
    }
    next();
  };
};
