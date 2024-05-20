
const mongoose = require('mongoose');

const sleepDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hours: { type: Number, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('SleepData', sleepDataSchema);
