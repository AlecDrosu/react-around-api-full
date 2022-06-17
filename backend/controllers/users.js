const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const UnauthorizedError = require("../errors/unauthorized-err");
const InvalidDataError = require("../errors/invalid-data-err");
const NotFoundError = require("../errors/not-found-err");

const ERROR = 500;

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  User.create({ name, about, avatar, email, password: hash })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new InvalidDataError(
          "There was an error validating your account"
        );
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
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

const updateUserAvatar = (req, res, next) => {
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

  const findUser = User.findOne({ email }).select("+password");
  if (!findUser) {
    next(new NotFoundError("User not found"));
  }

  const comparePassword = bcrypt.compareSync(password, findUser.password);
  if (!comparePassword) {
    next(new UnauthorizedError("Incorrect email or password"));
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
