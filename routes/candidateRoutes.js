const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  getAllCandidates,
  voteCandidate,
  commentCandidate,
  searchCandidates,
  getElectionResults,
} = require("../controllers/candidateController");

// Define routes
router.get("/", getAllCandidates);
router.post("/vote/:id", verifyToken, voteCandidate);
router.post("/:id/comment", verifyToken, commentCandidate);
router.get("/search", searchCandidates);
router.get("/results", getElectionResults);

module.exports = router;
