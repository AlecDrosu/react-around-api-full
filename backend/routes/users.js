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
  validateAuth,
} = require('../middlewares/validators')

router.post("/", createUser);
router.get("/", validateAuth, getUsers);
router.get('/me', getCurrentUser)
router.get("/:userId", validateId, getUser);
router.patch("/me", validateProfile, updateUserInfo);
router.patch("/me/avatar", validateAvatar, updateUserAvatar);

module.exports = router;
