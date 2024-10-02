import mongoose from "mongoose";

const categoryTypes = ["Technology", "Lifestyle", "Finance", "Health", "Travel", "Education"];


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    types: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, 
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
