const router = require("express").Router();
const {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { validateCard } = require("../middlewares/validators");

router.get("/", getCards);
router.post("/", validateCard, createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
