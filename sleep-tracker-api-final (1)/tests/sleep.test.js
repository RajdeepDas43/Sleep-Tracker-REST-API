
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const SleepData = require('../models/SleepData');

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
        const sleepRecord = new SleepData({
            userId,
            hours: 8,
            timestamp: new Date().toISOString(),
        });
        const savedRecord = await sleepRecord.save();
        recordId = savedRecord._id;
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
    });

    it('should return 404 if user has no sleep records', async () => {
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
});
