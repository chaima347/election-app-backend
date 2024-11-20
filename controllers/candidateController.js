const Candidate = require('../models/candidate'); // Assuming this is the Candidate model

// Fetch all candidates
exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Vote for a candidate
exports.voteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        candidate.votes += 1;
        await candidate.save();
        res.json({ message: 'Vote added successfully', candidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Comment on a candidate
exports.commentCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, content } = req.body;

        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        candidate.comments.push({ user, content });
        await candidate.save();

        res.json({ message: 'Comment added successfully', candidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

