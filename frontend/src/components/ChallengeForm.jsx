import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChallengeStore } from "../store/challengeStore"; // Assuming the challenge store is implemented
import axios from "axios";

const ChallengeForm = () => {
  const [challenge, setChallenge] = useState({
    name: "",
    skills: "",
    difficulty: "Beginner", // Default difficulty
    codeFile: null, // Change to null for file input
  });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    challenge: fetchedChallenge,
    fetchChallenge,
    createChallenge,
    editChallenge,
    isLoading,
    error,
  } = useChallengeStore(); // Use the challenge store here

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchChallengeToEdit = async () => {
        await fetchChallenge(id);
        setChallenge({
          name: fetchedChallenge.name || "",
          skills: fetchedChallenge.skills.join(", ") || "", // Convert array to string
          difficulty: fetchedChallenge.difficulty || "Beginner",
          codeFile: null, // Clear the file input
        });
      };

      fetchChallengeToEdit();
    }
  }, [id, fetchChallenge, fetchedChallenge]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallenge({ ...challenge, [name]: value });
  };

  const handleFileChange = (e) => {
    setChallenge({ ...challenge, codeFile: e.target.files[0] }); // Store the file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object

    formData.append("name", challenge.name);
    formData.append("skills", challenge.skills.split(",").map((skill) => skill.trim()));
    formData.append("difficulty", challenge.difficulty);
    if (challenge.codeFile) {
      formData.append("codeFile", challenge.codeFile); // Append the file to FormData
    }

    try {
      if (isEdit) {
        await editChallenge(id, formData);
      } else {
        await createChallenge(formData);
      }
      navigate("/ctf");
    } catch (error) {
      console.error("Error saving challenge:", error);
    }
  };

  return (
    <div className="container max-w-2xl p-4 mt-16">
      <h1 className="text-3xl font-bold mb-4 text-[#f0f0f0] font-mono">
        {isEdit ? "Edit Challenge" : "Create Challenge"}
      </h1>
      {isLoading && isEdit && <div className="text-[#ff9800]">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-[#0b1b29] rounded-md font-mono border border-[#ff9800] p-6 shadow"
      >
        <div className="mb-4">
          <label className="block text-[#f0f0f0] mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={challenge.name}
            onChange={handleChange}
            required
            className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#f0f0f0] mb-1">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={challenge.skills}
            onChange={handleChange}
            required
            className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#f0f0f0] mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={challenge.difficulty}
            onChange={handleChange}
            required
            className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
          >
            <option value="Beginner">Beginner</option>
            <option value="Trivial">Trivial</option>
            <option value="Moderate">Moderate</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[#f0f0f0] mb-1">Code File</label>
          <input
            type="file"
            name="codeFile"
            onChange={handleFileChange}
            required
            className="border rounded w-full p-2 bg-[#020d19] text-[#f0f0f0] border-cyan-500 focus:border-[#f9b34c] outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-[#ff9800] text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update Challenge" : "Create Challenge"}
        </button>
      </form>
    </div>
  );
};

export default ChallengeForm;
