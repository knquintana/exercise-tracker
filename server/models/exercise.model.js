const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  activityName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  activeCalories: {
    type: Number,
    required: false,
  },
  totalCalories: {
    type: Number,
    required: false,
  },
}, {
  timestamps: true,
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
