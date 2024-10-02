import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/challenge"
    : "/api/challenge";

axios.defaults.withCredentials = true;

export const useChallengeStore = create((set) => ({
  challenges: [],
  challenge: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  message: null,

  // CREATE Challenge
  createChallenge: async (challengeData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("name", challengeData.name);
      formData.append("skills", challengeData.skills);
      formData.append("difficulty", challengeData.difficulty);
      formData.append("codeFile", challengeData.codeFile);

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set({
        challenges: [...useChallengeStore.getState().challenges, response.data],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error creating challenge",
        isLoading: false,
      });
      throw error;
    }
  },

  // FETCH All Challenges
  fetchAllChallenges: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/all`);
      set({
        challenges: response.data,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching challenges",
        isLoading: false,
      });
      throw error;
    }
  },

  // FETCH Single Challenge by ID
  fetchChallengeById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      set({
        challenge: response.data, // Store the specific challenge in state
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching challenge",
        isLoading: false,
      });
      throw error;
    }
  },

  // UPDATE Challenge
  updateChallenge: async (id, challengeData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("name", challengeData.name);
      formData.append("skills", challengeData.skills);
      formData.append("difficulty", challengeData.difficulty);
      if (challengeData.codeFile) {
        formData.append("codeFile", challengeData.codeFile);
      }

      await axios.put(`${API_URL}/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the challenge list with the updated challenge
      const updatedChallenges = useChallengeStore.getState().challenges.map(
        (challenge) =>
          challenge._id === id ? { ...challenge, ...challengeData } : challenge
      );
      set({
        challenges: updatedChallenges,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating challenge",
        isLoading: false,
      });
      throw error;
    }
  },

  // DELETE Challenge
  deleteChallenge: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/delete/${id}`);

      // Remove the deleted challenge from the state
      const updatedChallenges = useChallengeStore
        .getState()
        .challenges.filter((challenge) => challenge._id !== id);

      set({
        challenges: updatedChallenges,
        isLoading: false,
        error: null,
        message: "Challenge deleted successfully!",
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error deleting challenge",
        isLoading: false,
      });
      throw error;
    }
  },
}));
