// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const path = require('path');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Load env variables
dotenv.config();

// Connect to DB
connectDB();


// Initialize Express
const app = express();
app.use(express.json()); 
app.use(cors({
  origin: ['https://sspgroups.online', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Routes

app.use('/api/user', userRoutes);

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send("S.S.Promoters Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 CORS allowed origin: ${process.env.CORS_ORIGIN}`);
});
