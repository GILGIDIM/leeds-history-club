import React from 'react';
import './PlaqueCard.css';

function PlaqueCard({ plaque, onClick }) {
  return (
    <div 
      className={`plaque-card ${plaque.visited ? 'visited' : 'unvisited'}`}
      onClick={onClick}
    >
      <div className="plaque-number">#{plaque.id}</div>
      
      <div className="plaque-content">
        <h3 className="plaque-title">{plaque.title}</h3>
        <p className="plaque-location">{plaque.location}</p>
        <p className="plaque-date">{plaque.date}</p>
      </div>

      {plaque.visited && (
        <div className="visited-badge">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
}

export default PlaqueCard;
