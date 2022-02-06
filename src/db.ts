import mongoose from "mongoose";
import chalk from "chalk";

function init() {
  const CONNECTION_STRING = process.env.URL as string;
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(
        chalk.italic.yellow("connection to database has been established")
      );
    })
    .catch((err: Error) => {
      console.log(chalk.red.bold("could not connect to db", err));
    });
}
export default init;
