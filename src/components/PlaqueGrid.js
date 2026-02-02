import React from 'react';
import PlaqueCard from './PlaqueCard';
import './PlaqueGrid.css';

function PlaqueGrid({ plaques, onPlaqueClick }) {
  return (
    <div className="plaque-grid-container">
      <div className="plaque-grid">
        {plaques.map(plaque => (
          <PlaqueCard
            key={plaque.id}
            plaque={plaque}
            onClick={() => onPlaqueClick(plaque)}
          />
        ))}
      </div>
      
      {plaques.length === 0 && (
        <div className="no-results">
          <p>No plaques found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default PlaqueGrid;
