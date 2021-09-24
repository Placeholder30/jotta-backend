const mongoose = require("mongoose");
const chalk = require("chalk");
function init() {
  const CONNECTION_STRING = process.env.URL;
  const mongoose = require("mongoose");
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
    .catch((err) => {
      console.log(chalk.red.bold("could not connect to db", err));
    });
}
module.exports = { init };
