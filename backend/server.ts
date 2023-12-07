import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
const app: Express = express();


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port} ...`);
});
