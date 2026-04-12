const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth'); // Moved import to the top
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // In production, you can use: app.use(cors({ origin: 'https://comrade-wallet-app.vercel.app' }));

// Routes: Define these BEFORE app.listen
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