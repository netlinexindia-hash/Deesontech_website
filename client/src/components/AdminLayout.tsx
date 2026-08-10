import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import './AdminLayout.css';

const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/products', label: 'Products', icon: '📦' },
  { path: '/admin/services', label: 'Services', icon: '⚙️' },
  { path: '/admin/contacts', label: 'Contacts', icon: '📩' },
  { path: '/admin/careers', label: 'Careers', icon: '💼' },
];

export default function AdminLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="admin-layout" id="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar" id="admin-sidebar">
        <Link to="/" className="admin-sidebar__logo">
          <span className="admin-sidebar__logo-icon">⬡</span>
          <span>Deeson<span className="gradient-text">tech</span></span>
        </Link>

        <p className="admin-sidebar__label">Admin Panel</p>

        <nav className="admin-sidebar__nav">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`admin-sidebar__link ${location.pathname === link.path ? 'admin-sidebar__link--active' : ''}`}
              id={`sidebar-${link.label.toLowerCase()}`}
            >
              <span className="admin-sidebar__link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="admin-sidebar__user-email">{user?.email}</p>
              <p className="admin-sidebar__user-role">{user?.role}</p>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={logout} id="logout-btn">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
