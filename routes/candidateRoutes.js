const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { getAllCandidates, voteCandidate, commentCandidate , favorizeCandidate ,searchCandidates, getElectionResults} = require('../controllers/candidateController');

// Define routes
router.get('/', verifyToken, getAllCandidates); 
router.post('/vote/:id', verifyToken, voteCandidate); 
router.post('/comment/:id', verifyToken, commentCandidate);
router.post('/favoriser/:id', verifyToken, favorizeCandidate);
router.get('/search', verifyToken ,searchCandidates);
router.get('/results', verifyToken, getElectionResults)

module.exports = router;
