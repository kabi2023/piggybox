import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const ExpenseForm = ({ onExpenseAdded, isLoading }) => {
  const [amountSpent, setAmountSpent] = useState('');
  const [dailyBudget, setDailyBudget] = useState(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amountSpent && !isNaN(amountSpent) && amountSpent >= 0) {
      onExpenseAdded({
        amountSpent: parseFloat(amountSpent),
        dailyBudget: parseFloat(dailyBudget)
      });
      setAmountSpent('');
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px', color: '#2d3748' }}>Add Today's Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dailyBudget">Daily Budget (₹)</label>
          <input
            id="dailyBudget"
            type="number"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amountSpent">Amount Spent Today (₹)</label>
          <input
            id="amountSpent"
            type="number"
            value={amountSpent}
            onChange={(e) => setAmountSpent(e.target.value)}
            placeholder="Enter amount spent"
            min="0"
            step="0.01"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
          style={{ width: '100%' }}
        >
          <PlusCircle size={20} />
          {isLoading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
