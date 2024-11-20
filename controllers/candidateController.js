const Candidate = require('../models/candidate'); 
const { Server } = require('socket.io'); 
const socketServer = new Server();  

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

        socketServer.emit('updateResults', {
          message: 'Vote added successfully',
          candidate: candidate
      });
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


//favorize a candidate 

exports.favorizeCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await Candidate.findById(id);

        if (!candidate) {
            return res.status(404).json({ message: 'Candidat non trouvé' });
        }

        candidate.favorites += 1;
        await candidate.save();

        res.status(200).json({ message: 'Candidat favorisé', candidate });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du candidat', error: err.message });
    }
};



//search
exports.searchCandidates = async (req, res) => {
    try {
        const { query } = req.query;
        const searchFilter = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { party: { $regex: query, $options: 'i' } }
            ]
        };
        const candidates = await Candidate.find(searchFilter);
        if (candidates.length === 0) {
            return res.status(404).json({ message: 'No candidates found' });
        }
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// election results
exports.getElectionResults = async (req, res) => {
  try {
      const candidates = await Candidate.find().sort({ votes: -1 }); 
      res.status(200).json(candidates);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

