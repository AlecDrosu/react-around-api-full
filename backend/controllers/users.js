const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const INVALID_DATA = 400;
const UNOTHORIZED = 401;
const NOT_FOUND = 404;
const ERROR = 500;

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  User.create({ name, about, avatar, email, password: hash })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(INVALID_DATA)
          .send({ message: "The information you entered was invalid" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const getUsers = (req, res) => {
  User.find()
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Users not found" });
    })
    .then((users) => res.status(200).send({ users }))
    .catch(() => {
      res.status(ERROR).send({ message: "There was an unexpected error" });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA).send({ message: "Invalid user ID" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "User not found" });
    }, next)
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

const updateUserInfo = (req, res) => {
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
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA).send({ message: "Invalid User ID" });
      } else if (err.name === "ValidationError") {
        res.status(INVALID_DATA).send({ message: "Invalid data" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdUpdate(
    req.user._id,
    {
      $set: {
        avatar: req.body.avatar,
      },
    },
    {
      new: false,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA).send({ message: "Invalid user id" });
      } else if (err.name === "ValidationError") {
        res.status(INVALID_DATA).send({ message: "Invalid data" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const findUser = User.findOne({ email }).select("+password");
  if (!findUser) {
    res.status(NOT_FOUND).send({ message: "User not found" });
  }

  const comparePassword = bcrypt.compareSync(password, findUser.password);
  if (!comparePassword) {
    res.status(UNOTHORIZED).send({ message: "Incorrect email or password" });
  }

  const token = jwt.sign({ _id: findUser._id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).send({ token });

  // also could try this

  // const { email, password } = req.body;
  // return User.findUserByCredentials(email, password)
  //   .then((user) => {
  //     const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  //     res.status(200).send({ data: user.toJSON(), token });
  //   })
  //   .catch((err) => {
  //     next(new UnauthorizedError("Invalid email or password"));
  //   });
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
