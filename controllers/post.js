const Post = require('../model/Post')
const User = require('../model/User')
const mongoose = require("mongoose");
const cloudinary = require('../utils/cloudinary')
const router = require('express').Router()
const upload = require('../utils/multer')

// Create route
exports.createData = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// router.post('/', upload.single('image'), (async(req, res)=> {
//   try {
//       const result = await cloudinary.uploader.upload(req.file.path)

//       //create instance of user
//       let user = new Post({
//           name: req.body.name,
//           title: req.body.title,
//           desc: req.body.desc,
//           date: req.body.date,
//           selectedFile: result.secure_url,
//           cloudinary_id: result.public_id
//       })

//       //save user
//       await user.save()
//       res.json(user)
//   } catch (error) {
//       console.log(error);
//   }
// }))

// Read route
exports.getData = async (req, res) => {
  try {
   const post = await Post.find()
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update route
// exports.getDataById = (req, res) => {
//   Post.findById(req.params.id, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     }
//     res.json(result);
//   });
// };
exports.getDataById = async(req, res) => {
  const {id} = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
};

exports.updateData = async(req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id")
    }

    const updatedPost = await Post.findByIdAndUpdate(_id, {...post, _id}, {new: true})

    res.json(updatedPost)
}

// Delete route
exports.deleteData = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
// exports.deleteData = async(req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).send("No post with that id");
//     }

//     await Post.findByIdAndRemove(id);

//     res.json({ message: "Post deleted successfully!" });
// };

exports.likePost = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}}, {new: true} )
    return res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.unLikePost = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}}, {new: true} )
    return res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}


exports.commentPost = async(req, res) => {
  try {
    const {id} = req.params
    const {value} = req.body

    const post = await Post.findById(id)

    post.comments.push(value);

    const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true})

    res.json(updatedPost)
  } catch (error) {
    res.status(500).json(error)
  }
}