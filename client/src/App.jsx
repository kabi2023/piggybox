import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import SavingsDisplay from './components/SavingsDisplay';
import MilestoneNotification from './components/MilestoneNotification';
import ExpenseChart from './components/ExpenseChart';
import ExpenseHistory from './components/ExpenseHistory';
import { expenseAPI } from './services/api';
import './index.css';

function App() {
  const [savingsData, setSavingsData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [milestoneMessage, setMilestoneMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load initial data
  useEffect(() => {
    fetchSavingsData();
    fetchHistoryData();
  }, []);

  const fetchSavingsData = async () => {
    try {
      const response = await expenseAPI.getSavings();
      setSavingsData(response.data);
    } catch (err) {
      setError('Failed to load savings data');
      console.error('Error fetching savings:', err);
    }
  };

  const fetchHistoryData = async () => {
    try {
      const response = await expenseAPI.getHistory({ limit: 30 });
      setHistoryData(response.data);
    } catch (err) {
      setError('Failed to load history data');
      console.error('Error fetching history:', err);
    }
  };

  const handleExpenseAdded = async (expenseData) => {
    setLoading(true);
    setError('');

    try {
      const response = await expenseAPI.addExpense(expenseData);

      // Show milestone notification if achieved
      if (response.data.milestoneNotification) {
        setMilestoneMessage(response.data.milestoneNotification);
      }

      // Refresh data
      await fetchSavingsData();
      await fetchHistoryData();

    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error('Error adding expense:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetMonthly = async () => {
    setLoading(true);
    setError('');

    try {
      await expenseAPI.resetMonthly();

      // Refresh data
      await fetchSavingsData();
      await fetchHistoryData();

      setError(''); // Clear any existing errors
      alert('Monthly data has been reset successfully!');

    } catch (err) {
      setError('Failed to reset monthly data');
      console.error('Error resetting monthly data:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeMilestoneNotification = () => {
    setMilestoneMessage('');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Piggy Box</h1>
        <p>Track your daily expenses and build your travel fund, one rupee at a time!</p>
        <p style={{ fontSize: '0.9rem', color: '#fff', marginTop: '8px' }}>
          📅 {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="notification" style={{
          background: '#fff5f5',
          border: '2px solid #feb2b2',
          color: '#742a2a'
        }}>
          <strong>Error:</strong> {error}
          <button
            onClick={() => setError('')}
            style={{
              float: 'right',
              background: 'none',
              border: 'none',
              color: '#742a2a',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Milestone Notification */}
      <MilestoneNotification
        message={milestoneMessage}
        onClose={closeMilestoneNotification}
      />

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gap: '24px' }}>
        {/* Row 1: Form and Savings Display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <ExpenseForm
            onExpenseAdded={handleExpenseAdded}
            isLoading={loading}
          />
          <SavingsDisplay savingsData={savingsData} />
        </div>

        {/* Row 2: Charts */}
        <ExpenseChart historyData={historyData} />

        {/* Row 3: History */}
        <ExpenseHistory
          historyData={historyData}
          onResetMonthly={handleResetMonthly}
        />
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: '#718096',
        fontSize: '0.9rem'
      }}>
        <p>Built with ❤️ for smart travelers | MERN Stack + Vite</p>
        <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>
          💡 Tip: Set a daily budget and stick to it to maximize your savings!
        </p>
      </div>
    </div>
  );
}

export default App;
