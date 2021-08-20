const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const { User, Journal } = require("./models/User");

router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        res.status(400).json({
          message: "could not complete that request, please try again",
        });
        return;
      }
      User.create(
        {
          name,
          password: hash,
          email,
        },
        (err, user) => {
          if (err) {
            res.status(400).json({
              message: "could not complete that request, soz",
            });
          } else {
            res.status(200).json({
              message: user,
            });
          }
        }
      );
    });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(403).json({
      message: "You don't have an account",
    });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({
        message: "Invalid username or password",
      });
    } else {
      res.status(200).json({
        message: "You've sucessfully logged in",
      });
    }
  }
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
    res.status(400).json({
      message: "you have no entry for this day",
    });
  } else {
    res.status(200).json({
      message: entry,
    });
  }
});
module.exports = router;
