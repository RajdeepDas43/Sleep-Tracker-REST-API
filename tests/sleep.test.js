const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const SleepData = require('../models/SleepData');
const createSleepData = require('../models/CreateSleepData');
const getSleepDataByUser = require('../models/GetSleepDataByUser');
const deleteSleepData = require('../models/DeleteSleepData');

describe('Sleep Tracker API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    let userId, recordId;

    beforeEach(async () => {
        userId = new mongoose.Types.ObjectId();
        const sleepRecord = await createSleepData({
            userId,
            hours: 8,
            timestamp: new Date().toISOString(),
        });
        recordId = sleepRecord._id;
    });

    afterEach(async () => {
        await SleepData.deleteMany({});
    });

    it('should create a new sleep record', async () => {
        const res = await request(app)
            .post('/api/sleep')
            .send({ userId: mongoose.Types.ObjectId(), hours: 7, timestamp: new Date().toISOString() });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.hours).toBe(7);
    });

    it('should not create a new sleep record with invalid data', async () => {
        const res = await request(app)
            .post('/api/sleep')
            .send({ userId: '', hours: 7, timestamp: '' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Invalid input data');
    });

    it('should get all sleep records for a user', async () => {
        const res = await request(app).get(`/api/sleep/${userId}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].hours).toBe(8);
    });

    it('should return an empty array if user has no sleep records', async () => {
        const newUserId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/sleep/${newUserId}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it('should delete a sleep record', async () => {
        const res = await request(app).delete(`/api/sleep/${recordId}`);
        expect(res.status).toBe(204);
    });

    it('should return 404 when trying to delete a non-existing record', async () => {
        const nonExistingId = new mongoose.Types.ObjectId();
        const res = await request(app).delete(`/api/sleep/${nonExistingId}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Record not found');
    });

    it('should return 400 for invalid create request', async () => {
        const res = await request(app)
            .post('/api/sleep')
            .send({ userId: 'invalidId', hours: 'invalidHours', timestamp: 'invalidTimestamp' });
        expect(res.status).toBe(400);
    });

    it('should handle server errors gracefully', async () => {
        const originalSave = SleepData.prototype.save;
        SleepData.prototype.save = jest.fn().mockImplementation(() => {
            throw new Error('Server error');
        });

        const res = await request(app)
            .post('/api/sleep')
            .send({ userId, hours: 8, timestamp: new Date().toISOString() });

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Internal Server Error');

        SleepData.prototype.save = originalSave;
    });

    it('should not get sleep records with invalid user ID', async () => {
        const res = await request(app).get('/api/sleep/invalidUserId');
        expect(res.status).toBe(400);
    });

    it('should not delete sleep record with invalid record ID', async () => {
        const res = await request(app).delete('/api/sleep/invalidRecordId');
        expect(res.status).toBe(400);
    });

    it('should create multiple sleep records and retrieve them', async () => {
        const sleepRecords = [
            { userId, hours: 6, timestamp: new Date().toISOString() },
            { userId, hours: 7, timestamp: new Date().toISOString() },
            { userId, hours: 8, timestamp: new Date().toISOString() },
        ];

        for (const record of sleepRecords) {
            await createSleepData(record);
        }

        const res = await request(app).get(`/api/sleep/${userId}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(4);  // including the one created in beforeEach
    });

    it('should not allow negative hours for sleep record', async () => {
        const res = await request(app)
            .post('/api/sleep')
            .send({ userId: mongoose.Types.ObjectId(), hours: -5, timestamp: new Date().toISOString() });
        expect(res.status).toBe(400);
    });

    it('should not allow future timestamps for sleep record', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const res = await request(app)
            .post('/api/sleep')
            .send({ userId: mongoose.Types.ObjectId(), hours: 8, timestamp: futureDate.toISOString() });
        expect(res.status).toBe(400);
    });
});
// Path: tests/sleep.test.js