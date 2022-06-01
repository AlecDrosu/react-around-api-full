const router = require("express").Router();

const {
  createUser,
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

const {
  validateId,
  validateProfile,
  validateAvatar,
} = require('../middlewares/validators')

router.post("/", createUser);
router.get("/", getUsers);
router.get('/me', getCurrentUser)
router.get("/:userId", validateId, getUser);
router.patch("/me", validateProfile, updateUserInfo);
router.patch("/me/avatar", validateAvatar, updateUserAvatar);

module.exports = router;
