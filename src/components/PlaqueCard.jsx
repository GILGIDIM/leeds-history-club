import React from 'react';

function PlaqueCard({ plaque, isVisited, onClick }) {
  return (
    <div 
      className={`plaque-card ${isVisited ? 'visited' : 'unvisited'}`}
      onClick={onClick}
    >
      <div className="plaque-card-content">
        <h3 className="plaque-title">{plaque.title}</h3>
        <div className="plaque-details">
          <p className="plaque-location">
            <span className="icon">📍</span>
            {plaque.location.length > 80 
              ? `${plaque.location.substring(0, 80)}...` 
              : plaque.location}
          </p>
          <p className="plaque-date">
            <span className="icon">📅</span>
            {plaque.date}
          </p>
        </div>
        {isVisited && (
          <div className="visited-badge">
            ✓ Visited
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaqueCard;
