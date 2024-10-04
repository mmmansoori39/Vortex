import Challenge from "../models/Challenges.js";
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Get the filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CREATE Challenge
export const createChallenge = async (req, res) => {
  try {
    const { name, skills, difficulty } = req.body;
    const codeFile = req.file ? req.file.path : null; 

    if (!name || !skills || !difficulty || !codeFile) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newChallenge = new Challenge({
      name,
      skills: skills.split(",").map((skill) => skill.trim()),
      difficulty,
      codeFile,
    });

    await newChallenge.save();
    return res.status(201).json({ message: "Challenge created successfully!", newChallenge });
  } catch (err) {
    res.status(500).json({ error: "Failed to create challenge." });
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


export const getChallengeById = async (req, res) => {
  const { id } = req.params;

  try {
 
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found." });
    }

    let codeContent = '';
    let fileType = '';


    if (challenge.codeFile) {
      const filePath = path.join(__dirname, '../..', challenge.codeFile);
      
      const fileExtension = path.extname(filePath);

      if (fileExtension === ".html") {
        fileType = "html";
      } else if (fileExtension === ".py") {
        fileType = "python";
      } else if (fileExtension === ".js") {
        fileType = "javascript";
      }

      if (fs.existsSync(filePath)) {
        codeContent = fs.readFileSync(filePath, 'utf8');
      } else {
        return res.status(404).json({ message: "Code file not found." });
      }
    }


    return res.status(200).json({
      challenge,
      codeContent,
      fileType,
    });

  } catch (err) {
    console.error(err);
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
    console.log(req.params.id)
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found." });
    }
    return res.status(200).json({ message: "Challenge deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete challenge." });
  }
};

