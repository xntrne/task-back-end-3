//routing user data
const { Router } = require("express");
const {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);

router.get("/:name", getUserByName);
router.patch("/:name", updateUser);
router.put("/:name", updateUser);
router.delete("/:name", deleteUser);

module.exports = router;
