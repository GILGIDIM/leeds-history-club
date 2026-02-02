import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // This will be replaced with Supabase authentication
    onLogin({ email });
  };

  return (
    <div className="login-modal-backdrop">
      <div className="login-modal">
        <button className="login-close" onClick={onClose}>×</button>
        
        <h2>Login to Leeds History Club</h2>
        <p className="login-subtitle">Track your blue plaque adventures</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="#signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
