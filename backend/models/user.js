const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    // required: true,
    default: "Explorer",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    validate: {
      validator: validator.isURL,
      message: "Invalid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject({
          name: "NotFoundError",
          message: "User not found",
        });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject({
            name: "AuthenticationError",
            message: "Invalid password",
          });
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
