const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const urlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: [true, "url is required"],
    unique: [true, "id already exists"],
  },
  longurl: {
    type: String,
    required: [true, "Long url is required"],
  },
  views: { type: Number },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
