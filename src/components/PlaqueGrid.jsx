import React, { useState } from 'react';
import PlaqueCard from './PlaqueCard';
import PlaqueModal from './PlaqueModal';

function PlaqueGrid({ plaques, visitedPlaques }) {
  const [selectedPlaque, setSelectedPlaque] = useState(null);

  return (
    <>
      <div className="plaque-grid">
        {plaques.map(plaque => (
          <PlaqueCard
            key={plaque.id}
            plaque={plaque}
            isVisited={!!visitedPlaques[plaque.id]}
            onClick={() => setSelectedPlaque(plaque)}
          />
        ))}
      </div>

      {plaques.length === 0 && (
        <div className="no-results">
          <p>No plaques found matching your criteria.</p>
        </div>
      )}

      {selectedPlaque && (
        <PlaqueModal
          plaque={selectedPlaque}
          isVisited={!!visitedPlaques[selectedPlaque.id]}
          visitData={visitedPlaques[selectedPlaque.id]}
          onClose={() => setSelectedPlaque(null)}
        />
      )}
    </>
  );
}

export default PlaqueGrid;
