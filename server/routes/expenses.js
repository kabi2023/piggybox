const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add new expense
router.post('/expenses', async (req, res) => {
  try {
    const { amountSpent, dailyBudget = 50 } = req.body;

    if (!amountSpent || amountSpent < 0) {
      return res.status(400).json({ error: 'Valid amount spent is required' });
    }

    const leftover = Math.max(0, dailyBudget - amountSpent);

    // Get the latest cumulative savings
    const latestExpense = await Expense.findOne().sort({ date: -1 });
    const previousSavings = latestExpense ? latestExpense.cumulativeSavings : 0;
    const cumulativeSavings = previousSavings + leftover;

    // Check for milestone
    const previousMilestone = Math.floor(previousSavings / 100);
    const currentMilestone = Math.floor(cumulativeSavings / 100);
    const milestoneReached = currentMilestone > previousMilestone ? currentMilestone * 100 : 0;

    const expense = new Expense({
      amountSpent,
      dailyBudget,
      leftover,
      cumulativeSavings,
      milestoneReached
    });

    await expense.save();

    res.status(201).json({
      expense,
      milestoneNotification: milestoneReached > 0 ? `Congratulations! You've saved ₹${milestoneReached}! Withdraw from ATM and put in your piggy bank!` : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current savings and milestone progress
router.get('/savings', async (req, res) => {
  try {
    const latestExpense = await Expense.findOne().sort({ date: -1 });
    const currentSavings = latestExpense ? latestExpense.cumulativeSavings : 0;
    const nextMilestone = Math.ceil(currentSavings / 100) * 100;
    const progressToNext = currentSavings % 100;

    // Get monthly stats
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyExpenses = await Expense.find({
      date: { $gte: startOfMonth }
    });

    const monthlyStats = monthlyExpenses.reduce((acc, expense) => ({
      totalSpent: acc.totalSpent + expense.amountSpent,
      totalSaved: acc.totalSaved + expense.leftover,
      days: acc.days + 1
    }), { totalSpent: 0, totalSaved: 0, days: 0 });

    res.json({
      currentSavings,
      nextMilestone,
      progressToNext,
      monthlyStats,
      milestonesAchieved: Math.floor(currentSavings / 100)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expense history
router.get('/history', async (req, res) => {
  try {
    const { limit = 30, month, year } = req.query;

    let query = {};
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset monthly savings
router.post('/reset-monthly', async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    await Expense.deleteMany({
      date: { $gte: startOfMonth }
    });

    res.json({ message: 'Monthly data reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
