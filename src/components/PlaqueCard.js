import React from 'react';
import './PlaqueCard.css';

function PlaqueCard({ plaque, onClick, onImageClick }) {
  const handleCircleClick = (e) => {
    e.stopPropagation();
    if (plaque.visited && plaque.imageUrl) {
      onImageClick(plaque);
    }
  };

  return (
    <div 
      className={`plaque-card-new ${plaque.visited ? 'visited' : 'unvisited'}`}
      onClick={onClick}
    >
      <div 
        className="plaque-circle"
        onClick={handleCircleClick}
        style={plaque.visited && plaque.imageUrl ? {
          backgroundImage: `url(${plaque.imageUrl})`,
          cursor: 'pointer'
        } : {}}
      >
        {plaque.visited && (
          <div className="circle-overlay">
            <svg className="check-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        )}
        {!plaque.visited && (
          <div className="plaque-number">#{plaque.id}</div>
        )}
      </div>

      <div className="plaque-info">
        <h3 className="plaque-title">{plaque.title}</h3>
        <p className="plaque-location">{plaque.location}</p>
        {plaque.visited && (
          <div className="visit-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Visited</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaqueCard;
