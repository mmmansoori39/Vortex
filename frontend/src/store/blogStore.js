import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/blog" : "/api/blog";

axios.defaults.withCredentials = true;

export const useBlogStore = create((set) => ({
	blog: [],
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	createBlog: async (blogData) => {
		set({ isLoading: true, error: null });
		try {
		  const response = await axios.post(`${API_URL}/add`, blogData);
		  set({
			blog: response.data,
			isLoading: false,
			error: null,
		  });
		} catch (error) {
		  set({
			error: error.response?.data?.message || "Error creating blog",
			isLoading: false,
		  });
		  throw error;
		}
	  },

	  editBlog: async (id, blogData) => {
		set({ isLoading: true, error: null });

		console.log(blogData)
		try {
		  const response = await axios.put(`${API_URL}/edit/${id}`, blogData);
		  set({
			isLoading: false,
			error: null,
		  });
		} catch (error) {
		  set({
			error: error.response?.data?.message || "Error updating blog",
			isLoading: false,
		  });
		  throw error;
		}
	  },

	fetchAllBlogs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/all`);

			set({
				isAuthenticated: true,
				blog: response.data,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

	fetchBlog: async (id) => {
		set({ isLoading: true, error: null });
		try {
		  const response = await axios.get(`${API_URL}/${id}`);
		  set({
			blog: response.data, // Store the fetched blog in the state
			error: null,
			isLoading: false,
		  });
		} catch (error) {
		  set({
			error: error.response?.data?.message || "Error fetching blog",
			isLoading: false,
		  });
		  throw error;
		}
	  },

	deleteBlog: async (id) => {
		set({isLoading: true, error: null})

		try {
			const response = await axios.delete(`${API_URL}/delete/${id}`);
			set({
				error: null,
				isLoading: false,
				message: response.data.message
			})
		} catch (error) {
			
		}
	},


	// resetPassword: async (token, password) => {
	// 	set({ isLoading: true, error: null });
	// 	try {
	// 		const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
	// 		set({ message: response.data.message, isLoading: false });
	// 	} catch (error) {
	// 		set({
	// 			isLoading: false,
	// 			error: error.response.data.message || "Error resetting password",
	// 		});
	// 		throw error;
	// 	}
	// },
}));