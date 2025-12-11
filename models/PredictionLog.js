// models/PredictionLog.js
const mongoose = require("mongoose");

const PredictionLogSchema = new mongoose.Schema({
  features: {
    type: [Number],
    required: true
  },
  prediction: {
    type: Number,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  latencyMs: {
    type: Number,
    required: true
  },
  meta: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model("PredictionLog", PredictionLogSchema);
