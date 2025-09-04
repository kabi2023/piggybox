const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  dailyBudget: {
    type: Number,
    required: true,
    default: 50
  },
  amountSpent: {
    type: Number,
    required: true
  },
  leftover: {
    type: Number,
    required: true
  },
  cumulativeSavings: {
    type: Number,
    required: true,
    default: 0
  },
  milestoneReached: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
expenseSchema.index({ date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);
