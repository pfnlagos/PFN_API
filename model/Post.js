const mongoose = require('mongoose')

// Post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    selectedFile: {
      type: String,
    },
    creator: {
      type: String,
    },
    username: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    label: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema); //data model
module.exports = Post;