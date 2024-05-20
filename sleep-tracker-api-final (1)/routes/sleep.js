
const express = require('express');
const router = express.Router();
const createSleepData = require('../models/CreateSleepData');
const getSleepDataByUser = require('../models/GetSleepDataByUser');
const deleteSleepData = require('../models/DeleteSleepData');

router.post('/', async (req, res) => {
  try {
    const sleepData = await createSleepData(req.body);
    res.status(201).json(sleepData);
  } catch (err) {
    res.status(400).json({ message: 'Error saving data', error: err });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const sleepRecords = await getSleepDataByUser(req.params.userId);
    res.json(sleepRecords);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err });
  }
});

router.delete('/:recordId', async (req, res) => {
  try {
    const result = await deleteSleepData(req.params.recordId);
    if (!result) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting data', error: err });
  }
});

module.exports = router;
