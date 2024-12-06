const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String, required: true },
  electoralProgram: { type: String, required: true },
  votes: { type: Number, default: 0 },
  img : { type: String, required: false },
  comments: [
    {
      user: { type: String, required: true },
      content: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Candidate', candidateSchema);
