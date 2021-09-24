const express = require("express");
require("dotenv").config();
const cors = require("cors");
const chalk = require("chalk");
const app = express();
const { init } = require("./db");

const router = require("./router");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "wecome to the home endpoint",
  });
});

app.listen(process.env.PORT || 3005, () => {
  console.log(chalk.yellow("app is now listening on port 3005"));
  init();
});
