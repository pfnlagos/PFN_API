const express = require('express');
const { createData, getData, getDataById, updateData, deleteData, likePost, unLikePost, commentPost } = require('../controllers/post');

const router = express.Router()

router.get("/", getData);
router.post("/", createData);
router.get("/:id", getDataById);
router.patch("/:id", updateData);
router.delete("/:id", deleteData);
router.put("/likePost", likePost);
router.put("/unLikePost", unLikePost);
router.post("/:id/commentPost", commentPost);


module.exports = router;