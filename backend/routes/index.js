const router = require("express").Router();

const userRouter = require("./users");
const cardRouter = require("./cards");
const { createUser, login } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/cards", cardRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
