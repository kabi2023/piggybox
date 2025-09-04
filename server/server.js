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


// const mongoose = require('mongoose');
// require('dotenv').config();
// const expenseRoutes = require('./routes/expenses');

// // connect to DB once
// let isConnected = false;
// async function connectDB() {
//   if (isConnected) return;
//   await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   isConnected = true;
// }

// // Serverless handler
// export default async function handler(req, res) {
//   await connectDB();

//   if (req.method === 'GET') {
//     try {
//       const expenses = await Expense.find();
//       return res.status(200).json(expenses);
//     } catch (err) {
//       return res.status(500).json({ error: 'Failed to fetch expenses' });
//     }
//   }

//   if (req.method === 'POST') {
//     try {
//       const expense = new Expense(req.body);
//       await expense.save();
//       return res.status(201).json(expense);
//     } catch (err) {
//       return res.status(400).json({ error: 'Failed to create expense' });
//     }
//   }

//   res.setHeader('Allow', ['GET', 'POST']);
//   return res.status(405).end(`Method ${req.method} Not Allowed`);
// }
