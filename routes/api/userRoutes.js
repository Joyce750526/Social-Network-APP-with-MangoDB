const router = require("express").Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUser).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

module.exports = router;
