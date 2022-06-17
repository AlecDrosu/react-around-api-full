const Card = require("../models/card");

const InvalidDataError = require("../errors/invalid-data-err");
const NotFoundError = require("../errors/not-found-err");
const UnauthorizedError = require("../errors/unauthorized-err");

const ERROR = 500;

const getCards = (req, res) => {
  Card.find()
    .orFail(() => {
      throw new NotFoundError("Cards not Found");
    })
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new InvalidDataError("Invalid Card ID");
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
        throw new InvalidDataError("Invalid Card ID");
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError("Card not found");
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new UnauthorizedError("You are not authorized");
      } else {
        card.remove();
        res.send({ message: "Card deleted" });
      }
    })
    .catch(next);
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Card not Found");
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new InvalidDataError("Invalid Card ID");
      } else {
        res.status(ERROR).send({ message: "There was an unexpected error" });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Card not Found");
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new InvalidDataError("Invalid Card ID");
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
