import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  difficulty: { type: String, enum: ['Beginner', 'Trivial', 'Moderate', 'Intermediate', 'Advanced'], required: true },
  codeFile: { type: String, required: true } 
});

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge; 