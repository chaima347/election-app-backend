const user = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users); // Send the list of users as a JSON response
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving users', error: err.message }); // Handle errors
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

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(500).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
