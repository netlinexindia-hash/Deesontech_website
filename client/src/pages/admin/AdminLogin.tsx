import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="admin-login" id="admin-login-page">
      <div className="admin-login__bg-grid" />
      <div className="admin-login__glow" />

      <div className="admin-login__card glass-card animate-fade-in-up">
        <div className="admin-login__header">
          <span className="admin-login__icon">⬡</span>
          <h1>Deeson<span className="gradient-text">tech</span></h1>
          <p className="admin-login__subtitle">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} id="admin-login-form">
          {error && <div className="admin-login__error">{error}</div>}
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Email</label>
            <input
              className="form-input"
              type="email"
              id="admin-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yourdomain.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input
              className="form-input"
              type="password"
              id="admin-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg admin-login__submit"
            disabled={loading}
            id="admin-login-submit"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
