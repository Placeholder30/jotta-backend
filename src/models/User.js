const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: ["enter a valid email"], unique: true },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const journalSchema = new Schema(
  {
    date: { type: String, required: true },
    fullDate: String,
    text: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
const Journal = mongoose.model("journal", journalSchema);

module.exports = { User, Journal };
