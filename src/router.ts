import { Response, Request } from "express";

import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";

import { createToken, validateToken } from "./middleware/auth";
const {
  registrationSchema,
  postJournalSchema,
} = require("./helpers/validator");
const { User, Journal } = require("./models/User");

router.post("/register", async (req: Request, res: Response) => {
  const { name, password, email } = req.body;
  const { error } = registrationSchema.validate({ name, password, email });
  if (error) return res.status(400).json({ message: error.message });

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, password: hashedPassword, email });
    const token = await createToken(user._id);
    user.token = token;
    return res
      .status(201)
      .json({ data: { userId: user._id, name: user.name, email: user.email } });
  } catch (error: any) {
    console.log(error);
    if (error.name == "MongoError" && error.code == 11000) {
      return res
        .status(400)
        .json({ message: "this email has been taken by another user" });
    }
    res.status(400).json({ message: error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //handle no user account
    if (!user) {
      return res.status(400).json({
        message: "You don't have an account",
      });
    }
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = await createToken(user._id);

      return res.status(200).json({
        data: { name: user.name, email: user.email, token },
      });
    }
    //handle invalid password or username
    return res.status(401).json({
      message: "Invalid username or password",
    });
  } catch (error) {
    return res.status(400).json({ message: "an error occured", error });
  }
});

router.post("/journal", validateToken, async (req: Request, res: Response) => {
  const { text, date } = req.body;
  const { error } = postJournalSchema.validate({ text, date });
  //@ts-ignore
  const userId = req.token.data;
  if (error) return res.status(400).json({ message: error.message });
  const journal = await Journal.findOneAndUpdate(
    {
      date,
      userId,
    },
    { date, userId, text },
    { upsert: true, new: true }
  );

  if (!journal) {
    return res
      .status(400)
      .json({ message: "could not save entry please try again" });
  } else {
    return res.status(200).json({ data: journal });
  }
});

router.get("/journal", validateToken, async (req: Request, res: Response) => {
  const { date } = req.query;
  //@ts-ignore
  const userId = req.token.data;
  try {
    const entry = await Journal.findOne({ userId, date });
    if (!entry) {
      return res.status(200).json({
        data: "you have no entry for this day",
      });
    } else {
      return res.status(200).json({
        data: entry,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
});
export default router;
