import express, { Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import chalk from "chalk";
import init from "./db";
import router from "./router";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send({
    message: "wecome to the home endpoint",
  });
});

app.listen(process.env.PORT || 3005, () => {
  console.log(chalk.yellow("app is now listening on port 3005"));
  init();
});
