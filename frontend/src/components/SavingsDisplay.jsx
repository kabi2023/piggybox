import React from "react";
import { PiggyBank, Target, TrendingUp } from "lucide-react";

const SavingsDisplay = ({ savingsData }) => {
  if (!savingsData) return null;

  const { currentSavings, nextMilestone, progressToNext, monthlyStats, milestonesAchieved } = savingsData;
  const progressPercentage = nextMilestone > 0 ? (progressToNext / nextMilestone) * 100 : 0;

  return (
    <div className="card">
      <h2 style={{ marginBottom: '24px', color: '#2d3748', textAlign: 'center' }}>
        Your Savings Dashboard
      </h2>

      <div className="stats-grid">
        <div className="stat-card">
          <PiggyBank size={32} color="#667eea" style={{ marginBottom: '8px' }} />
          <div className="stat-value">₹{currentSavings.toFixed(2)}</div>
          <div className="stat-label">Total Savings</div>
        </div>

        <div className="stat-card">
          <Target size={32} color="#38a169" style={{ marginBottom: '8px' }} />
          <div className="stat-value">{milestonesAchieved}</div>
          <div className="stat-label">Milestones Achieved</div>
        </div>

        <div className="stat-card">
          <TrendingUp size={32} color="#e53e3e" style={{ marginBottom: '8px' }} />
          <div className="stat-value">₹{monthlyStats.totalSaved.toFixed(2)}</div>
          <div className="stat-label">This Month</div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#4a5568' }}>Progress to ₹{nextMilestone}</span>
          <span style={{ color: '#667eea', fontWeight: '600' }}>
            ₹{progressToNext.toFixed(2)} / ₹{nextMilestone}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {monthlyStats.days > 0 && (
        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px' }}>
          <h3 style={{ color: '#2d3748', marginBottom: '8px' }}>Monthly Summary</h3>
          <p style={{ color: '#4a5568', margin: '4px 0' }}>
            Total Days: <strong>{monthlyStats.days}</strong>
          </p>
          <p style={{ color: '#4a5568', margin: '4px 0' }}>
            Total Spent: <strong>₹{monthlyStats.totalSpent.toFixed(2)}</strong>
          </p>
          <p style={{ color: '#4a5568', margin: '4px 0' }}>
            Average Daily Savings: <strong>₹{(monthlyStats.totalSaved / monthlyStats.days).toFixed(2)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default SavingsDisplay;
