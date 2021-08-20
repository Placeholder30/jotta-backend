const mongoose = require("mongoose");
const chalk = require("chalk");
function init() {
  const CONNECTION_STRING = process.env.URL;
  const mongoose = require("mongoose");
  mongoose.set("useCreateIndex", true);
  mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log(chalk.blue("successfully connected to mogodb"));
  });
}
module.exports = { init };
