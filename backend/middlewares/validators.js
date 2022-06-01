const { Joi, celebrate } = require("celebrate");
const validate = require('validator')

const validateProfile = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be less than 30 characters long",
    }),
    about: Joi.string().required().min(2).max(30).messages({
      "string.empty": "About is required",
      "string.min": "About must be at least 2 characters long",
      "string.max": "About must be less than 30 characters long",
    }),
  },
});

const validateId = celebrate({
  // check to see if the ID is valid
  params: {
    userId: Joi.string().alphanum().required().messages({
      "string.empty": "User ID is required",
      "string.alphanum": "User ID must be alphanumeric",
    }),
  },
})

const validateAvatar = celebrate({
  body: {
    avatar: Joi.string().required().messages({
      "string.empty": "Avatar is required",
      "string.pattern.base": "Avatar must be a link",
    }),
  },
})

module.exports = {
  validateAvatar,
  validateProfile,
  validateId,
}
