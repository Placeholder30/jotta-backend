const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    // journal: {
    //   type: Schema.Types.ObjectId,
    //   ref: "journal",
    // },
  },
  { timestamps: true }
);

const journalSchema = new Schema(
  {
    date: String,
    fullDate: String,
    text: String,
    userId: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
const Journal = mongoose.model("journal", journalSchema);

module.exports = { User, Journal };
