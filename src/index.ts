import express, { Express, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import config from "./config";
import connectDB from "./config/database";
import errorHandler from "./middleware/errorHandler";

const app: Express = express();

connectDB();

app.use(
  cors({
    origin: config.corsOrigin,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to Express TypeScript API",
    version: "1.0.0",
  });
});
app.use("/api", routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`⚡️ Server is running at http://localhost:${config.port}`);
});
