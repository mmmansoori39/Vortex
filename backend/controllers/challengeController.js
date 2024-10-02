import Challenge from "../models/Challenges.js";
import upload from "../middleware/upload.js";

// CREATE a Challenge
export const createChallenge = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      const { name, skills, difficulty } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
      }

      const newChallenge = new Challenge({
        name,
        skills: skills.split(",").map((skill) => skill.trim()), // Split skills by comma
        difficulty,
        codeFile: req.file.path, // Store file path
      });

      await newChallenge.save();
      return res.status(201).json({ message: "Challenge uploaded successfully!" });
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload challenge." });
  }
};

// READ: Get All Challenges
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    return res.status(200).json(challenges);
  } catch (err) {
    return res.status(500).json({ error: "Failed to retrieve challenges." });
  }
};

// READ: Get a Single Challenge by ID
export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found." });
    }
    return res.status(200).json(challenge);
  } catch (err) {
    return res.status(500).json({ error: "Failed to retrieve challenge." });
  }
};

// UPDATE a Challenge
export const updateChallenge = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      const { name, skills, difficulty } = req.body;
      const updateData = {
        name,
        skills: skills.split(",").map((skill) => skill.trim()),
        difficulty,
      };

      // Check if a new file was uploaded
      if (req.file) {
        updateData.codeFile = req.file.path;
      }

      const updatedChallenge = await Challenge.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedChallenge) {
        return res.status(404).json({ message: "Challenge not found." });
      }

      return res.status(200).json({ message: "Challenge updated successfully!" });
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update challenge." });
  }
};

// DELETE a Challenge
export const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found." });
    }
    return res.status(200).json({ message: "Challenge deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete challenge." });
  }
};
