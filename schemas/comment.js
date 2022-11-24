const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    commentId: {
        type: Number,
        required: true,
        unique: true,
    },
    commentName: {
        type: String,
        required: true
    },
    commentContext: {
        type:String,
    }, 
    blogId: {
        type: Number,
    }
});

module.exports = mongoose.model("Comment", commentsSchema);