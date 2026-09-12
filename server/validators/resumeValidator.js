const { body } = require("express-validator");

const createResumeValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Resume title is required"),

  body("personalInfo.email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Personal email must be valid"),

  body("personalInfo.phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters"),
];

const updateResumeValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Resume title cannot be empty"),

  body("personalInfo.email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Personal email must be valid"),

  body("personalInfo.phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters"),
];

module.exports = {
  createResumeValidation,
  updateResumeValidation,
};