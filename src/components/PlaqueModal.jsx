import React from 'react';

function PlaqueModal({ plaque, isVisited, visitData, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{plaque.title}</h2>
          {isVisited && (
            <span className="visited-badge-large">✓ Visited</span>
          )}
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <strong>📍 Location:</strong>
            <p>{plaque.location}</p>
          </div>

          <div className="detail-row">
            <strong>📅 Unveiling Date:</strong>
            <p>{plaque.date}</p>
          </div>

          <div className="detail-row">
            <strong>🎭 Unveiled by:</strong>
            <p>{plaque.unveiler}</p>
          </div>

          <div className="detail-row">
            <strong>🤝 Sponsored by:</strong>
            <p>{plaque.sponsor}</p>
          </div>

          {isVisited && visitData && (
            <div className="visit-section">
              <h3>Your Visit</h3>
              {visitData.imageUrl && (
                <div className="visit-image">
                  <img src={visitData.imageUrl} alt={`Visit to ${plaque.title}`} />
                </div>
              )}
              {visitData.visitDate && (
                <p className="visit-date">
                  <strong>Visited on:</strong> {visitData.visitDate}
                </p>
              )}
              {visitData.notes && (
                <p className="visit-notes">
                  <strong>Notes:</strong> {visitData.notes}
                </p>
              )}
            </div>
          )}

          {!isVisited && (
            <div className="upload-section">
              <p className="upload-prompt">
                Haven't visited this plaque yet? Sign in to upload your photo when you do!
              </p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default PlaqueModal;
