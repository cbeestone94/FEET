// Using Express.js for the backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/feet_tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the check-in schema
const CheckInSchema = new mongoose.Schema({
    timestamp: Date,
    focusMinutes: Number,
    energy: Number,
    emotion: String,
    timeSpent: String,
    userId: String
});

const CheckIn = mongoose.model('CheckIn', CheckInSchema);

app.use(cors());
app.use(express.json());

// Save check-in
app.post('/api/checkin', async (req, res) => {
    try {
        const checkIn = new CheckIn(req.body);
        await checkIn.save();
        res.status(201).json(checkIn);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save check-in' });
    }
});

// Get user's check-ins
app.get('/api/checkins/:userId', async (req, res) => {
    try {
        const checkIns = await CheckIn.find({ userId: req.params.userId });
        res.json(checkIns);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch check-ins' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000')); 