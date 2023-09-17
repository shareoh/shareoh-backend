const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      enum: ['sharer', 'borrower', 'admin'],
      required: true,
   },
   profile_picture: String,
   location: String,
   bio: String,
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;