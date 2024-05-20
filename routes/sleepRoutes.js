
const express = require('express');
const {
    createSleepRecord,
    getSleepRecords,
    deleteSleepRecord,
} = require('../controllers/sleepController');

const router = express.Router();

router.post('/', createSleepRecord);
router.get('/:userId', getSleepRecords);
router.delete('/:recordId', deleteSleepRecord);

module.exports = router;
