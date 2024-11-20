const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { getAllCandidates, voteCandidate, commentCandidate } = require('../controllers/candidateController');

// Define routes
router.get('/', verifyToken, getAllCandidates); 
router.post('/vote/:id', verifyToken, voteCandidate); 
router.post('/comment/:id', verifyToken, commentCandidate);

module.exports = router;
