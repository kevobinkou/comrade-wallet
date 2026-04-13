const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth'); 
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// FIXED CORS: Explicitly allow your Vercel frontend
app.use(cors({
    origin: 'https://comrade-wallet-app.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 MongoDB Connected! ComradeWallet is ready."))
    .catch(err => console.error("Database connection error:", err));

// Test route
app.get('/', (req, res) => {
    res.send("ComradeWallet API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));