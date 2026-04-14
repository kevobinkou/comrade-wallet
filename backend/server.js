const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'https://comrade-wallet-app.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.send("ComradeWallet API is running...");
});

// MongoDB events
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Start server ONLY after DB connects
const startServer = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

startServer();