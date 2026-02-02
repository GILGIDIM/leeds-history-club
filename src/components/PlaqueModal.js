import React, { useState } from 'react';
import './PlaqueModal.css';

function PlaqueModal({ plaque, onClose, onImageUpload, isAuthenticated }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = () => {
    if (uploadedImage) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        onImageUpload(plaque.id, uploadedImage);
        setIsUploading(false);
        setUploadedImage(null);
      }, 500);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-number">Plaque #{plaque.id}</div>
          <h2 className="modal-title">{plaque.title}</h2>
          {plaque.visited && (
            <div className="modal-visited-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Visited
            </div>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-info-section">
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">{plaque.location}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Unveiled:</span>
              <span className="info-value">{plaque.date}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Unveiler:</span>
              <span className="info-value">{plaque.unveiler}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Sponsor:</span>
              <span className="info-value">{plaque.sponsor}</span>
            </div>
          </div>

          {plaque.imageUrl && (
            <div className="modal-image-section">
              <h3>Your Visit</h3>
              <img src={plaque.imageUrl} alt={`Visit to ${plaque.title}`} className="visit-image" />
            </div>
          )}

          {isAuthenticated && !plaque.visited && (
            <div className="modal-upload-section">
              <h3>Upload Your Visit Photo</h3>
              <div className="upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image-upload"
                  className="file-input"
                />
                <label htmlFor="image-upload" className="upload-label">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Preview" className="upload-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <p>Click to upload your photo</p>
                    </div>
                  )}
                </label>
              </div>
              {uploadedImage && (
                <button 
                  className="upload-submit-btn" 
                  onClick={handleUploadSubmit}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Mark as Visited'}
                </button>
              )}
            </div>
          )}

          {!isAuthenticated && !plaque.visited && (
            <div className="modal-auth-prompt">
              <p>Login to upload photos and mark plaques as visited</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaqueModal;
