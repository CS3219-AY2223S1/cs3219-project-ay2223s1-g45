const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('questionModels', questionSchema);
