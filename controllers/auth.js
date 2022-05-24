const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const Post = require("../model/Post")

//Register
exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    // const token = jwt.sign({id: user._id, email: user.email}, `${process.env.JWT_SECRET}`, {expiresIn: "10min"})
    res.status(201).json({ user});
    // sendToken(user, 201, res);

    const existingUser = await User.findOne({ email });
    if (existingUser){

      return res.status(400).json({ message: "User Already Exist" });
    }

  } catch (err) {
    // res.status(500).json(err)
    next(err);
  }
};

//Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide username and password", 400));
    // res.status(400).json({success: false, error: "Please provide username and password"})
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    !user && next(new ErrorResponse("Wrong Credentials", 400));
    // res.status(400).json("Wrong Credentials");

    const isMatch = await user.matchPassword(password);

    !isMatch && next(new ErrorResponse("Wrong Credentials", 400));
    // res.status(404).json({ success: false, error: "Wrong Credentials" });
    // res.status(200).json({
    //   success: true,
    //   token: "ueui45j5j53s"
    // })
    // sendToken(user, 201, res);
    // const token = jwt.sign({id: user._id, email: user.email}, `${process.env.JWT_SECRET}`, {expiresIn: "10min"})
    res.status(201).json({ user});
    
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
exports.updatePic = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
    if(req.body.userId === req.params.id){
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
          // await Post.f({ username: user.username });
          const updatedPost = await Post.updateMany({username: User.username}, {$set: req.body}, {new: true})
          const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
          res.status(200).json(updatedUser, updatedPost)
        } catch (err) {
          res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can update only your account!")
    }
};


//DELETE
exports.deleteUser = async (req, res) => {
  try {
    await Post.deleteMany({ username: user.username });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET USER
exports.getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllUsers = async (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json(result);
  });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};