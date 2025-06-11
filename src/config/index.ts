import dotenv from "dotenv";

dotenv.config();

interface IConfig {
  env: string;
  port: number;
  corsOrigin: string;
}

const config: IConfig = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

export default config;
