import React, { useState, useEffect } from 'react';
import './App.css';
import PlaqueGrid from './components/PlaqueGrid';
import PlaqueModal from './components/PlaqueModal';
import ProgressTracker from './components/ProgressTracker';
import LoginForm from './components/LoginForm';
import plaquesData from './data/plaques.json';

function App() {
  const [plaques, setPlaques] = useState(plaquesData);
  const [selectedPlaque, setSelectedPlaque] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'visited', 'unvisited'
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Calculate visited count
  const visitedCount = plaques.filter(p => p.visited).length;
  const totalCount = plaques.length;

  // Filter plaques based on status and search
  const filteredPlaques = plaques.filter(plaque => {
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'visited' ? plaque.visited :
      !plaque.visited;
    
    const matchesSearch = 
      plaque.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plaque.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handlePlaqueClick = (plaque) => {
    setSelectedPlaque(plaque);
  };

  const handleCloseModal = () => {
    setSelectedPlaque(null);
  };

  const handleImageUpload = (plaqueId, imageUrl) => {
    setPlaques(prevPlaques => 
      prevPlaques.map(plaque => 
        plaque.id === plaqueId 
          ? { ...plaque, visited: true, imageUrl } 
          : plaque
      )
    );
    // In production, this would save to Supabase
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="site-title">Leeds History Club</h1>
          <p className="site-subtitle">Tracking the Blue Plaques of Leeds</p>
          
          {!isAuthenticated ? (
            <button 
              className="auth-button"
              onClick={() => setIsAuthenticated(true)}
            >
              Login to Upload Photos
            </button>
          ) : (
            <button 
              className="auth-button logged-in"
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <ProgressTracker 
        visitedCount={visitedCount} 
        totalCount={totalCount} 
      />

      <div className="controls-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search plaques by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({totalCount})
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'visited' ? 'active' : ''}`}
            onClick={() => setFilterStatus('visited')}
          >
            Visited ({visitedCount})
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'unvisited' ? 'active' : ''}`}
            onClick={() => setFilterStatus('unvisited')}
          >
            Not Visited ({totalCount - visitedCount})
          </button>
        </div>
      </div>

      <PlaqueGrid 
        plaques={filteredPlaques}
        onPlaqueClick={handlePlaqueClick}
      />

      {selectedPlaque && (
        <PlaqueModal
          plaque={selectedPlaque}
          onClose={handleCloseModal}
          onImageUpload={handleImageUpload}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
}

export default App;
