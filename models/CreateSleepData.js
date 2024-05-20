
const mongoose = require('mongoose');
const SleepData = require('./SleepData');  // Importing the main SleepData model

// Function to create sleep data
async function createSleepData(data) {
    const newSleepData = new SleepData(data);
    await newSleepData.save();
    return newSleepData;
}

module.exports = createSleepData;
