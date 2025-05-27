const mongoose = require('mongoose');
const Schema = mongoose.Schema; // defines the structure of the documents

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema); // model -> wraps around
module.exports = Blog;