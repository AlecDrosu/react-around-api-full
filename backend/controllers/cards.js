const Card = require("../models/card");

const INVALID_DATA = 400;
const NOT_FOUND = 404;
const ERROR = 500;

const getCards = (req, res) => {
  Card.find()
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Cards not found" });
    })
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA).send({ message: "Invalid Card ID" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(INVALID_DATA).send({ message: "Invalid Card ID" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Card not found" });
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA).send({ message: "Invalid Card ID" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Card not found" });
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA).send({ message: "Invalid Card ID" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Card not found" });
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INVALID_DATA).send({ message: "Invalid Card ID" });
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
