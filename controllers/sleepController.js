const createSleepData = require('../models/CreateSleepData');
const getSleepDataByUser = require('../models/GetSleepDataByUser');
const deleteSleepData = require('../models/DeleteSleepData');
const ApiError = require('../utils/apiError');

const createSleepRecord = async (req, res, next) => {
    try {
        const { userId, hours, timestamp } = req.body;
        if (!userId || !hours || !timestamp) {
            throw new ApiError(400, 'Invalid input data');
        }
        const sleepData = await createSleepData({ userId, hours, timestamp });
        res.status(201).json(sleepData);
    } catch (error) {
        next(error);
    }
};

const getSleepRecords = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const sleepData = await getSleepDataByUser(userId);
        res.status(200).json(sleepData);
    } catch (error) {
        next(error);
    }
};

const deleteSleepRecord = async (req, res, next) => {
    try {
        const { recordId } = req.params;
        const sleepData = await deleteSleepData(recordId);
        if (!sleepData) {
            throw new ApiError(404, 'Record not found');
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSleepRecord,
    getSleepRecords,
    deleteSleepRecord,
};
