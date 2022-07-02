const router = require("express").Router();

const userRouter = require("./users");
const cardRouter = require("./cards");

router.use("/users", userRouter);
router.use("/cards", cardRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
