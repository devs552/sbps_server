const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  ContestName: { type: String, required: true },
  TopTeamLabel: { type: String, required: true },
  LeftTeamLabel: { type: String, required: true },
  square: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  rules: { type: String, required: true, unique: true },
  paymentMethod: { type: String, required: true, unique: true },
  PlayerPassword: { type: String, required: true },
  contextImage: { type: String, required: false }, // Added field for context image
  prizeInfo:  { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Contest', contestSchema);
