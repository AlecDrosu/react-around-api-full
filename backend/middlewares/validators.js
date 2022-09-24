const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message("invalid URL");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message("invalid Email");
};

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.empty": "Name is required (error here 1)",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be less than 30 characters long",
    }),
    about: Joi.string().min(2).max(30).messages({
      "string.empty": "About is required",
      "string.min": "About must be at least 2 characters long",
      "string.max": "About must be less than 30 characters long",
    }),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(8).messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
    }),
  }),
});

const validateId = celebrate({
  // check to see if the ID is valid
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required().messages({
      "string.empty": "User ID is required",
      "string.alphanum": "User ID must be alphanumeric",
    }),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL).messages({
      "string.empty": "Avatar is required",
      "string.pattern.base": "Avatar must be a link",
    }),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be less than 30 characters long",
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": "Link is required",
      "string.pattern.base": "Link must be a link",
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Email must be a valid email",
    }),
    password: Joi.string().required().min(8).messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
    }),
  }),
});

const validateAuth = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      "string.empty": "Authorization is required",
    }),
  }).unknown(true),
});

module.exports = {
  validateAvatar,
  validateProfile,
  validateId,
  validateCard,
  validateLogin,
  validateAuth,
};
