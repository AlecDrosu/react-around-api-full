const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const { JWT_SECRET } = require("../utils/config");

const UnauthorizedError = require("../errors/unauthorized-err");
const InvalidDataError = require("../errors/invalid-data-err");
const NotFoundError = require("../errors/not-found-err");

const ERROR = 500;

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new InvalidDataError(`User with email ${email} already exists`);
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => {
          res.status(201).json({ data: user });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res) => {
  User.find()
    .orFail(() => {
      throw new NotFoundError("Users not found");
    })
    .then((users) => res.status(200).send({ users }))
    .catch(() => {
      res.status(ERROR).send({ message: "There was an unexpected error here" });
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidDataError("Invalid user id or password"));
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("User not found");
    }, next)
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name: req.body.name,
        about: req.body.about,
      },
    },
    {
      new: false,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidDataError("Invalid user id"));
      } else if (err.name === "ValidationError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

// const updateUserAvatar = (req, res, next) => {
//   User.findByIdUpdate(
//     req.user._id,
//     {
//       $set: {
//         avatar: req.body.avatar,
//       },
//     },
//     {
//       new: false,
//       runValidators: true,
//     }
//   )
//     .then((user) => {
//       if (!user) {
//         next(new NotFoundError("User not found"));
//       } else {
//         res.status(200).send({ user });
//       }
//     })
//     .catch((err) => {
//       if (err.name === "CastError") {
//         next(new InvalidDataError("Invalid user id"));
//       } else if (err.name === "ValidationError") {
//         next(new InvalidDataError("Invalid data"));
//       } else {
//         res.status(ERROR).send({ message: "There was an unexpected error" });
//       }
//     });
// };

const updateUserAvatar = (req, res, next) => {
  const avatarUser = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    avatarUser,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidDataError("Invalid user id"));
      } else if (err.name === "ValidationError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.status(200).send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new UnauthorizedError("Invalid email or password"));
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,
};
