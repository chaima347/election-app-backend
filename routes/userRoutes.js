const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  updateUser,
  getCurrentUser,
  favorizeCandidate,
} = require("../controllers/userController");

// Protected routes
router.get("/", verifyToken, getAllUsers);
router.get("/me", verifyToken, getCurrentUser);
router.put("/update/:id", verifyToken, updateUser);
router.post('/favoriser/:id', verifyToken, favorizeCandidate);

module.exports = router;
