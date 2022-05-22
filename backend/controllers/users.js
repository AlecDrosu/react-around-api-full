const User = require("../models/user");

const INVALID_DATA = 400;
const NOT_FOUND = 404;
const ERROR = 500;

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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
    },
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
    },
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

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
};
