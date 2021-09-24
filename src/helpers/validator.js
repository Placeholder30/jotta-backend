const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().trim(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const postJournalSchema = Joi.object({
  date: Joi.string().required(),
  text: Joi.string().allow(""),
});

const getJournalSchema = Joi.object({
  date: Joi.string().required(),
});
module.exports = {
  registrationSchema,
  loginSchema,
  postJournalSchema,
  getJournalSchema,
};
