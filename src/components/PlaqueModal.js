import React, { useState } from 'react';
import './PlaqueModal.css';

function PlaqueModal({ plaque, onClose, onImageUpload, onDeleteVisit, isAuthenticated }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async () => {
    if (selectedFile) {
      setIsUploading(true);
      await onImageUpload(plaque.id, selectedFile, notes);
      setIsUploading(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setNotes('');
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
              Visited by Leeds Office
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
              <div className="image-section-header">
                <h3>Our Visit</h3>
                {isAuthenticated && onDeleteVisit && (
                  <button 
                    className="delete-visit-btn"
                    onClick={() => onDeleteVisit(plaque.id)}
                    title="Delete this visit"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete Visit
                  </button>
                )}
              </div>
              <img src={plaque.imageUrl} alt={`Visit to ${plaque.title}`} className="visit-image" />
              {plaque.uploadedBy && (
                <p className="upload-info">Uploaded by {plaque.uploadedBy}</p>
              )}
              {plaque.notes && (
                <p className="visit-notes">{plaque.notes}</p>
              )}
            </div>
          )}

          {isAuthenticated && !plaque.visited && (
            <div className="modal-upload-section">
              <h3>Upload Visit Photo</h3>
              <div className="upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="image-upload"
                  className="file-input"
                />
                <label htmlFor="image-upload" className="upload-label">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="upload-preview" />
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
              
              {selectedFile && (
                <>
                  <div className="form-group">
                    <label htmlFor="notes">Notes (optional)</label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any notes about the visit... Who was there? Any interesting stories?"
                      className="notes-textarea"
                      rows="3"
                    />
                  </div>
                  <button 
                    className="upload-submit-btn" 
                    onClick={handleUploadSubmit}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Mark as Visited'}
                  </button>
                </>
              )}
            </div>
          )}

          {!isAuthenticated && !plaque.visited && (
            <div className="modal-auth-prompt">
              <p>Admin login required to upload photos and mark plaques as visited</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaqueModal;
