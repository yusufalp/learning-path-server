import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import protectedRoutes from "./routes/protectedRouter.js";

const server = express();
const PORT = process.env.PORT || 4000;

server.use(helmet());
server.use(morgan("dev"));

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

server.use(express.json());
server.use(cookieParser());

server.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

server.use("/api", protectedRoutes);

server.listen(PORT, () => {
  console.log(`Server running - http://localhost:${PORT}`);
  console.log(`Health check - http://localhost:${PORT}/health`);
});
