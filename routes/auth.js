const express = require('express');
const { registerUser, loginUser, updatePic, updateUser, deleteUser, getUsersById, getAllUsers } = require('../controllers/auth');
const router = express.Router()

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updatePic);
router.put("/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUsersById);
router.get("/", getAllUsers);


module.exports = router;