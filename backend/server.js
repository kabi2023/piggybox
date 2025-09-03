const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: "*"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', expenseRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Travel Savings Tracker API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
