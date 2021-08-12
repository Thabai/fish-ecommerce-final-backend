const mongoose = require("mongoose");

const fishSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  scientific: {
    type: String,
    unique: true,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  habitat: {
    type: String,
    required: true,
    default: "Info incoming",
  },
  description: {
    type: String,
    required: true,
  },
  compatibility: {
        temperature: {
        type: String,
        required: true,
        default: "Info incoming",
      },
        temperament: {
        type: String,
        required: true,
        default: "Info incoming",
    },
    foodsource: {
      type: String,
        required: true,
        default: "Info incoming",
      },
    social: {
        type: String,
        required: true,
        default: "Info incoming",
    },
    breeding: {
        type: String,
        required: true,
        default: "Info incoming",
  }},
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Fish = mongoose.model("Fish", fishSchema);

module.exports = Fish;
