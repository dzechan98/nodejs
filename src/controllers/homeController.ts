import { Request, Response } from "express";

export const getHome = (req: Request, res: Response) => {
  res.json({
    message: "API is working",
    timestamp: new Date().toISOString(),
  });
};
