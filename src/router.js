const { Router } = require("express");
const router = Router();
const { User, Journal } = require("./models/User");

router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.create({
    name,
    password,
    email,
  });
  res.send({
    message: user,
  });
});

router.get("/login", async (req, res) => {
  const user = await User.findOne({ firstName: "Anonymous" });
  res.send(user);
});

router.post("/journal", async (req, res) => {
  const { text, userId, date } = req.body;
  const journal = await Journal.findOneAndUpdate(
    {
      date,
      userId,
    },
    { date, userId, text },
    { upsert: true, new: true }
  );
  if (!journal) {
    res.status(400).json({ message: "could not save entry please try again" });
  } else {
    res.status(200).json({ message: journal });
  }
});

router.get("/journal", async (req, res) => {
  const { userId, date } = req.query;
  const entry = await Journal.findOne({ userId, date });
  if (!entry) {
    console.log(entry);
    res.status(400).json({
      message: "you have no entry for this day",
    });
  } else {
    console.log(entry);
    res.status(200).json({
      message: entry,
    });
  }
});
module.exports = router;
