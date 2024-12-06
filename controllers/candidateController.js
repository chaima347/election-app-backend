const Candidate = require("../models/candidate");
const User = require("../models/user");
const { Server } = require("socket.io");
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
      return res.status(404).json({ message: "Candidate not found" });
    }

    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.alreadyVoted) {
      return res.status(400).json({ message: "User already voted" });
    }

    socketServer.emit("updateResults", {
      message: "Vote added successfully",
      candidate: candidate,
    });

    candidate.votes += 1;
    await candidate.save();

    user.alreadyVoted = true;
    await user.save();

    res.json({ message: "Vote added successfully", candidate });
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
      return res.status(404).json({ message: "Candidate not found" });
    }

    candidate.comments.push({ user, content });
    await candidate.save();

    res.json({ message: "Comment added successfully", candidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//search
exports.searchCandidates = async (req, res) => {
  try {
    const { query } = req.query;
    const searchFilter = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { party: { $regex: query, $options: "i" } },
      ],
    };
    const candidates = await Candidate.find(searchFilter);
    if (candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found" });
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
