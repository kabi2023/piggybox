import React, { useState } from 'react';
import { Calendar, TrendingDown, TrendingUp, Trash2 } from 'lucide-react';

const ExpenseHistory = ({ historyData, onResetMonthly }) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!historyData || historyData.length === 0) {
    return (
      <div className="card">
        <h2 style={{ marginBottom: '20px', color: '#2d3748' }}>Expense History</h2>
        <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
          <Calendar size={48} color="#cbd5e0" style={{ marginBottom: '16px' }} />
          <p>No expenses recorded yet.</p>
          <p>Add your first expense to start tracking!</p>
        </div>
      </div>
    );
  }

  const handleResetConfirm = () => {
    onResetMonthly();
    setShowConfirmReset(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#2d3748', margin: 0 }}>Expense History</h2>
        <button
          onClick={() => setShowConfirmReset(true)}
          className="btn btn-secondary"
          style={{ padding: '8px 16px', fontSize: '14px' }}
        >
          <Trash2 size={16} />
          Reset Month
        </button>
      </div>

      {showConfirmReset && (
        <div className="notification" style={{
          background: '#fff5f5',
          border: '2px solid #feb2b2',
          color: '#742a2a',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Confirm Reset</strong>
              <p style={{ margin: '4px 0 0 0' }}>This will delete all expense data for this month. This action cannot be undone.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
              <button
                onClick={handleResetConfirm}
                className="btn"
                style={{
                  background: '#e53e3e',
                  color: 'white',
                  padding: '6px 12px',
                  fontSize: '12px'
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {historyData.map((expense) => (
          <div key={expense._id} className="history-item">
            <div>
              <div className="history-date">{formatDate(expense.date)}</div>
              <div style={{ fontSize: '0.85rem', color: '#718096', marginTop: '2px' }}>
                Budget: ₹{expense.dailyBudget.toFixed(2)}
                {expense.milestoneReached > 0 && (
                  <span style={{
                    marginLeft: '8px',
                    color: '#38a169',
                    fontWeight: '600',
                    fontSize: '0.8rem'
                  }}>
                    🎉 ₹{expense.milestoneReached} Milestone!
                  </span>
                )}
              </div>
            </div>

            <div className="history-amounts">
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingDown size={16} />
                <span className="amount-spent">₹{expense.amountSpent.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={16} />
                <span className="amount-saved">+₹{expense.leftover.toFixed(2)}</span>
              </div>

              <div style={{
                fontSize: '0.8rem',
                color: '#667eea',
                fontWeight: '600',
                textAlign: 'right'
              }}>
                Total: ₹{expense.cumulativeSavings.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {historyData.length > 10 && (
        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          padding: '12px',
          background: 'rgba(102, 126, 234, 0.05)',
          borderRadius: '8px',
          color: '#4a5568',
          fontSize: '0.9rem'
        }}>
          Showing {historyData.length} entries
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;
