import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: [true, "Blog ID is required"],
  },
  name: {
    type: String,
    required: [true, "Commenter name is required"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    minlength: [5, "Comment must be at least 5 characters long"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
