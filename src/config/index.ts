import dotenv from "dotenv";

dotenv.config();

interface IConfig {
  env: string;
  port: number;
  corsOrigin: string;
  mongoUrl: string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  swaggerBaseUrl: string;
}

const config: IConfig = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  corsOrigin: process.env.CORS_ORIGIN || "*",
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase",
  jwtSecret: process.env.JWT_SECRET || "averysecretkey",
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || "anotherverysecretkeyforrefresh",
  swaggerBaseUrl:
    process.env.SWAGGER_BASE_URL ||
    `http://localhost:${process.env.PORT || 3000}`,
};

export default config;
