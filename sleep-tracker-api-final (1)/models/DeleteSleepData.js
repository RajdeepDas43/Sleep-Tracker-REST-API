
const SleepData = require('./SleepData');  // Importing the main SleepData model

// Function to delete sleep data by record ID
async function deleteSleepData(recordId) {
    return await SleepData.findByIdAndDelete(recordId);
}

module.exports = deleteSleepData;
