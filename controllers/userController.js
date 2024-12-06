const User = require("../models/user");
const Candidate = require("../models/candidate");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: err.message }); // Handle errors
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;

    // Fetch the current user and populate favorites
    const currentUser = await User.findById(userId).populate("favorites");

    if (!currentUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    
    const { password, ...others } = currentUser._doc;

    res.status(200).json({
      ...others,
      favorites: currentUser.favorites, 
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving user and favorites",
      error: err.message,
    });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateFields = { name, email };
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(500).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//favorize a candidate
exports.favorizeCandidate = async (req, res) => {
  try {
    const { id } = req.params; // Candidate ID from the URL parameter
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidat non trouvé" });
    }

    // Get the userId from the decoded token in the request
    const { userId } = req.user;

    // Fetch the user from the database using userId
    const user = await User.findById(userId);
    console.log("User retrieved from database:", user); // Check if user exists

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Check if the candidate is already favorited
    const isFavorited = user.favorites.includes(candidate._id);
    if (isFavorited) {
      return res.status(400).json({ message: "Candidat déjà favorisé" });
    }

    // Add the candidate to the user's favorites list
    user.favorites.push(candidate._id);
    await user.save(); // Save the updated user document

    res.status(200).json({ message: "Candidat favorisé", candidate });
    
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du candidat",
      error: err.message,
    });
  }
};

