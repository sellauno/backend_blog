const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    blogId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dateCreation: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
});

module.exports = mongoose.model("Blog", blogsSchema);