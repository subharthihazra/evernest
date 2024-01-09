import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { SERVER_PORT } from "./config/env";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";
import ErrorMiddleware from "./errorhandlers/ErrorMiddleware";
import connectDB from "./db/connect";

const app: Express = express();

// use CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// parse cookie
app.use(cookieParser());

// Adding Auth Router
app.use("/auth", authRouter);

// Adding Auth Router
app.use("/admin", adminRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// ERROR middleware (must be in last)
app.use(ErrorMiddleware);

const startServer = async () => {
  try {
    await connectDB();

    const port = String(SERVER_PORT) || 5000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port} ...`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
