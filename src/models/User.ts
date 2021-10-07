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
    text: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
export const Journal = mongoose.model("journal", journalSchema);
