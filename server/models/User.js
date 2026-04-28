const { Schema, model } = require('mongoose');

const User = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  birthDate: { type: Date },
  gitHubUrl: { type: String },
  linkedinUrl: { type: String },
  headHunterUrl: { type: String },
  userLearn: { type: Number },
  userExperience: { type: Number },
  userProfession: { type: String },
  userCity: { type: String },
  userBiography: { type: String },
  shortBiography: { type: String },
  userStack: { type: Array },
});

module.exports = model('User', User);
