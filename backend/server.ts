import { SERVER_PORT } from "./config/env";
import authRouter from "./routes/auth";
import ErrorMiddleware from "./errorhandlers/ErrorMiddleware";
import express, { Express, Request, Response } from "express";
import connectDB from "./db/connect";

const app: Express = express();

app.use(authRouter);

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
