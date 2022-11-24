const express = require('express');
const Blog = require('../schemas/blog');
const router = express.Router();
const Comment = require('../schemas/comment');

// Get All coment in post
router.get('/comments/:postId', async (req, res) => {
    const { blogId } = req.params;

    const comments = await Comment.find({ blogId: blogId });
    res.json({
        comments: comments.map((comment) => ({
            commentId: comment.commentId,
            commentName: comment.commentName,
            commentContext: comment.commentContext,
        })),
    })
});

// Create comment
router.post('/comments/:postId', async (req, res) => {
    const { blogId } = req.params;
    const { commentId, commentName, commentContext } = req.body;

    if (commentContext == '' || commentContext == null) {
        return res.json({ success: false, errorMesssage: "Please enter the comment content" });
    }

    const existComment = await Comment.find({ commentId });
    if (existComment.length) {
        return res.json({ success: false, errorMesssage: 'Data already exist' });
    }

    await Comment.create({ commentId: Number(commentId), commentName: commentName, commentContext: commentContext, blogId: blogId });

    res.json({ result: 'success' });
});

// Edit Comment
router.put('/comment/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { commentName, commentContext } = req.body;

    if (commentContext == '' || commentContext == null) {
        return res.json({ success: false, errorMesssage: "Please enter the comment content" });
    }

    const existComment = await Comment.findOne({ commentId: Number(commentId) });
    if (existComment != null) {
        await Comment.updateOne({ commentId: Number(commentId) }, { $set: { commentName: commentName, commentContext: commentContext, blogId: existComment.blogId } })
        res.json({ success: true });
    }else{
        res.json({ success: false, errorMesssage: "Data doesn't exist!"});
    }

});

// Delete comment
router.delete('/comment/:commentId', async(req, res) => {
    const { commentId } = req.params;
    const existComment = await Comment.find({ commentId });
    if(existComment.length > 0){
        await Comment.deleteOne({ commentId });
    }

    res.json({ success: true });
});

module.exports = router;