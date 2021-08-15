const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: john,
  });
});

app.listen(process.env.PORT || 3005, () => {
  console.log("app is now listening on port");
});
