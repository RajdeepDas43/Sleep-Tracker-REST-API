
const SleepData = require('./SleepData');  // Importing the main SleepData model

// Function to get sleep data by user
async function getSleepDataByUser(userId) {
    return await SleepData.find({ userId }).sort('timestamp');
}

module.exports = getSleepDataByUser;
