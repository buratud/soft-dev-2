const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  text: String,    // The comment text
  rating: Number,  // The comment rating (you can use a different type, e.g., String, if needed)
  // You can add more fields as needed
});

// Create a Comment model from the schema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model
module.exports = Comment;
