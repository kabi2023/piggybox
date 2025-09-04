import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ExpenseChart = ({ historyData }) => {
  if (!historyData || historyData.length === 0) {
    return (
      <div className="card">
        <h2 style={{ marginBottom: '20px', color: '#2d3748' }}>Expense Analytics</h2>
        <p style={{ textAlign: 'center', color: '#718096', padding: '40px' }}>
          No data available. Start adding expenses to see your analytics!
        </p>
      </div>
    );
  }

  const chartData = historyData.slice().reverse().map(expense => ({
    date: new Date(expense.date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    }),
    spent: expense.amountSpent,
    saved: expense.leftover,
    budget: expense.dailyBudget
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '8px' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: '4px 0' }}>
              {entry.name}: ₹{entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px', color: '#2d3748' }}>Expense Analytics</h2>

      {/* Line Chart for Trends */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568' }}>Daily Expense Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              stroke="#718096"
              fontSize={12}
            />
            <YAxis
              stroke="#718096"
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="spent"
              stroke="#e53e3e"
              strokeWidth={2}
              name="Amount Spent"
              dot={{ fill: '#e53e3e', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="saved"
              stroke="#38a169"
              strokeWidth={2}
              name="Amount Saved"
              dot={{ fill: '#38a169', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#667eea"
              strokeWidth={1}
              strokeDasharray="5 5"
              name="Daily Budget"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart for Comparison */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#4a5568' }}>Spending vs Savings Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.slice(-10)}> {/* Show last 10 days */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              stroke="#718096"
              fontSize={12}
            />
            <YAxis
              stroke="#718096"
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="spent"
              fill="#e53e3e"
              name="Amount Spent"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="saved"
              fill="#38a169"
              name="Amount Saved"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
