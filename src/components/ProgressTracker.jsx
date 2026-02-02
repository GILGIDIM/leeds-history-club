import React from 'react';

function ProgressTracker({ total, visited }) {
  const percentage = total > 0 ? Math.round((visited / total) * 100) : 0;

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <h2>Your Progress</h2>
        <span className="progress-count">
          {visited} / {total} plaques visited
        </span>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        >
          {percentage > 0 && <span className="progress-percentage">{percentage}%</span>}
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
