const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
    default: false,
  },
});
module.exports = mongoose.model("User", userShema);
