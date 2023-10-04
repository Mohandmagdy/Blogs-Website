const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: [50, 'description must be at least 50 characters']
    },
    category: {
        type: String,
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;