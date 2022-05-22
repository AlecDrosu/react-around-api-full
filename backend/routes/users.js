const router = require("express").Router();

const {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userId", getUser);
router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
