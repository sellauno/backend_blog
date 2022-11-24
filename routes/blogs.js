const express = require('express');
const router = express.Router();
const Blog = require('../schemas/blog');


// Get all blogs
router.get('/blogs', async (req, res) => {
    const blogs = await Blog.find();

    res.json({
        blogs: blogs.map((blog) => ({
            title: blog.title,
            name: blog.name,
            dateCreation: blog.dateCreation,
        })),
    });
});

// Create blog
router.post('/blogs', async (req, res) => {
    const { blogId, name, title, dateCreation, password, content } = req.body;
    const blogs = await Blog.find({ blogId });
    if (blogs.length) {
        return res.status(400).json({ success: false, errorMessage: "The data already exists." });
    }

    const createdBlogs = await Blog.create({ blogId, name, title, dateCreation, password, content });

    res.json({ blogs: createdBlogs });
});

// Get detail blog 
router.get('/blogs/:blogId', async (req, res) => {
    const { blogId } = req.params;
    const blogs = await Blog.find({ blogId: Number(blogId) });

    res.json({
        blogs: blogs.map((blog) => ({
            title: blog.title,
            name: blog.name,
            dateCreation: blog.dateCreation,
            content: blog.content,
        })),
    });
});

// Update blog
router.put('/blogs/:blogId', async (req, res) => {
    const { blogId } = req.params;
    const { name, title, dateCreation, password, content } = req.body;
    const oldBlog = await Blog.findOne({ blogId });

    if (oldBlog.password == password) {
        await Blog.updateOne({ blogId: Number(blogId) }, { $set: { name, title, dateCreation, content } });
    } else {
        res.json({ success: false, errorMessage: 'Password does not match!' });
    }

    res.json({ success: true });
});

// Delete blog
router.delete('/blogs/:blogId', async (req, res) => {
    const { blogId } = req.params;

    const existBlog = await Blog.find({ blogId });
    if (existBlog.length > 0) {
        await Blog.deleteOne({ blogId });
    }

    res.json({ result: "success" });
});

// Post delete blog
router.post('/blogs/delete/:blogId', async (req, res) => {
    const { blogId } = req.params;
    const { password } = req.body;

    const existBlog = await Blog.findOne({ blogId });
    if (password == existBlog.password) {
        await Blog.deleteOne({ blogId });
    } else {
        res.json({ success: false, errorMessage: "Wrong password!" })
    }
    res.json({ result: "success" });
});

module.exports = router;