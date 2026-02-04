import React, { useState, useEffect } from 'react';
import './App.css';
import PlaqueGrid from './components/PlaqueGrid';
import PlaqueModal from './components/PlaqueModal';
import ProgressTracker from './components/ProgressTracker';
import LoginForm from './components/LoginForm';
import plaquesData from './data/plaques.json';
import { supabase } from './supabaseClient';

function App() {
  const [plaques, setPlaques] = useState(plaquesData);
  const [selectedPlaque, setSelectedPlaque] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'visited', 'unvisited'
  const [filterLocation, setFilterLocation] = useState('citycentre'); // 'all', 'citycentre'
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'

  // Load visits from Supabase on mount
  useEffect(() => {
    loadVisits();
    checkUser();
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Check if user is already logged in
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
  };

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load all visits from database
  const loadVisits = async () => {
    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .order('visit_date', { ascending: false });

    if (error) {
      console.error('Error loading visits:', error);
      return;
    }

    // Mark plaques as visited if they have a visit record
    const updatedPlaques = plaquesData.map(plaque => {
      const visit = data?.find(v => v.plaque_id === plaque.id);
      return {
        ...plaque,
        visited: !!visit,
        imageUrl: visit?.image_url || null,
        visitDate: visit?.visit_date || null,
        uploadedBy: visit?.uploaded_by || null,
        notes: visit?.notes || null,
      };
    });

    setPlaques(updatedPlaques);
  };

  // Calculate visited count based on current location filter
  const activePlaques = filterLocation === 'citycentre' 
    ? plaques.filter(p => p.cityCentre)
    : plaques;
  
  const visitedCount = activePlaques.filter(p => p.visited).length;
  const totalCount = activePlaques.length;

  // Filter plaques based on status, location, and search
  const filteredPlaques = plaques.filter(plaque => {
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'visited' ? plaque.visited :
      !plaque.visited;
    
    const matchesLocation =
      filterLocation === 'all' ? true :
      plaque.cityCentre;
    
    const matchesSearch = 
      plaque.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plaque.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesLocation && matchesSearch;
  });

  const handlePlaqueClick = (plaque) => {
    setSelectedPlaque(plaque);
  };

  const handleImageClick = (plaque) => {
    setSelectedImage(plaque);
  };

  const handleCloseModal = () => {
    setSelectedPlaque(null);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleImageUpload = async (plaqueId, imageFile, notes) => {
    if (!user) return;

    try {
      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${plaqueId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('plaque-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('plaque-images')
        .getPublicUrl(filePath);

      // Save visit record to database
      const { error: dbError } = await supabase
        .from('visits')
        .insert({
          plaque_id: plaqueId,
          image_url: publicUrl,
          uploaded_by: user.email,
          notes: notes || null,
        });

      if (dbError) throw dbError;

      // Reload visits to update UI
      await loadVisits();
      handleCloseModal();
      
      alert('Visit recorded successfully! 🎉');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const handleDeleteVisit = async (plaqueId) => {
    if (!user) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this visit? This will remove the photo and mark the plaque as unvisited.'
    );

    if (!confirmDelete) return;

    try {
      // Get the visit record to find the image URL
      const { data: visit, error: fetchError } = await supabase
        .from('visits')
        .select('*')
        .eq('plaque_id', plaqueId)
        .single();

      if (fetchError) throw fetchError;

      // Extract filename from URL
      if (visit.image_url) {
        const urlParts = visit.image_url.split('/');
        const fileName = urlParts[urlParts.length - 1];

        // Delete image from storage
        const { error: storageError } = await supabase.storage
          .from('plaque-images')
          .remove([fileName]);

        if (storageError) console.error('Error deleting image:', storageError);
      }

      // Delete visit record from database
      const { error: dbError } = await supabase
        .from('visits')
        .delete()
        .eq('plaque_id', plaqueId);

      if (dbError) throw dbError;

      // Reload visits to update UI
      await loadVisits();
      handleCloseModal();
      
      alert('Visit deleted successfully!');
    } catch (error) {
      console.error('Error deleting visit:', error);
      alert('Error deleting visit. Please try again.');
    }
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="App loading">
        <div className="loader">Loading Leeds History Club...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="site-title">Leeds History Club</h1>
          <p className="site-subtitle">Tracking the Blue Plaques of Leeds</p>
          
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                  Dark Mode
                </>
              )}
            </button>

            {!user ? (
              <button 
                className="auth-button"
                onClick={handleLogin}
              >
                Admin Login
              </button>
            ) : (
              <div className="user-info">
                <span className="welcome-text">Welcome, {user.email.split('@')[0]}! 👋</span>
                <button 
                  className="auth-button logged-in"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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

        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label">Location:</label>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filterLocation === 'citycentre' ? 'active' : ''}`}
                onClick={() => setFilterLocation('citycentre')}
              >
                City Centre ({plaques.filter(p => p.cityCentre).length})
              </button>
              <button 
                className={`filter-btn ${filterLocation === 'all' ? 'active' : ''}`}
                onClick={() => setFilterLocation('all')}
              >
                All Leeds ({plaques.length})
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Status:</label>
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
        </div>
      </div>

      <PlaqueGrid 
        plaques={filteredPlaques}
        onPlaqueClick={handlePlaqueClick}
        onImageClick={handleImageClick}
      />

      {selectedPlaque && (
        <PlaqueModal
          plaque={selectedPlaque}
          onClose={handleCloseModal}
          onImageUpload={handleImageUpload}
          onDeleteVisit={handleDeleteVisit}
          isAuthenticated={!!user}
        />
      )}

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
        />
      )}

      {selectedImage && (
        <div className="image-modal-backdrop" onClick={handleCloseImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseImageModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img 
              src={selectedImage.imageUrl} 
              alt={`Visit to ${selectedImage.title}`} 
              className="full-image"
              style={{ cursor: 'zoom-in' }}
              onClick={(e) => {
                e.target.classList.toggle('zoomed');
                e.target.style.cursor = e.target.classList.contains('zoomed') ? 'zoom-out' : 'zoom-in';
              }}
            />
            <div className="image-caption">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
