import React from 'react';
import './ProgressTracker.css';

function ProgressTracker({ visitedCount, totalCount }) {
  const percentage = Math.round((visitedCount / totalCount) * 100);

  return (
    <div className="progress-tracker">
      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-number">{visitedCount}</span>
          <span className="stat-label">Visited</span>
        </div>
        <div className="stat-divider">/</div>
        <div className="stat-item">
          <span className="stat-number">{totalCount}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        >
          <span className="progress-percentage">{percentage}%</span>
        </div>
      </div>

      {percentage === 100 && (
        <div className="completion-message">
          🎉 Congratulations! You've visited all Leeds blue plaques!
        </div>
      )}
    </div>
  );
}

export default ProgressTracker;
