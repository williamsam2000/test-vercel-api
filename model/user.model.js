const mongoose = require("mongoose");

const consultWith = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  firebaseUID: {
    type: String,
    trim: true,
  },
});

const User = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    // required: "First Name is required",
  },
  lastName: {
    type: String,
    trim: true,
    // required: "Last Name is required",
  },
  email: {
    type: String,
    trim: true,
    // required: "Email is required",
  },
  firebaseUID: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  doctorType: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  consultWith: [consultWith],
});

module.exports = mongoose.model("User", User);
