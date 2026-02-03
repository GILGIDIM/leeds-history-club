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
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'visited', 'unvisited'
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load visits from Supabase on mount
  useEffect(() => {
    loadVisits();
    checkUser();
  }, []);

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
          onDeleteVisit={handleDeleteVisit}
          isAuthenticated={!!user}
        />
      )}

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
        />
      )}
    </div>
  );
}

export default App;
