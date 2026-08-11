import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '9', icon: '📦' },
    { label: 'Total Services', value: '6', icon: '⚙️' },
    { label: 'Unread Messages', value: '12', icon: '📩', highlight: true },
    { label: 'Open Positions', value: '6', icon: '💼' },
  ];

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Dashboard Overview</h1>
        <p className="admin-page__subtitle">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="admin-dashboard__stats">
        {stats.map((stat, i) => (
          <div key={i} className={`admin-stat-card card ${stat.highlight ? 'admin-stat-card--highlight' : ''}`}>
            <div className="admin-stat-card__icon">{stat.icon}</div>
            <div className="admin-stat-card__info">
              <span className="admin-stat-card__label">{stat.label}</span>
              <span className="admin-stat-card__value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-dashboard__grid">
        <div className="admin-panel card">
          <h2 className="admin-panel__title">Quick Actions</h2>
          <div className="admin-quick-actions">
            <Link to="/admin/products" className="btn btn-secondary">Add New Product</Link>
            <Link to="/admin/services" className="btn btn-secondary">Update Services</Link>
            <Link to="/admin/contacts" className="btn btn-primary">View Messages</Link>
          </div>
        </div>

        <div className="admin-panel card">
          <h2 className="admin-panel__title">Recent Activity</h2>
          <ul className="admin-activity-list">
            <li>
              <span className="admin-activity-time">2 hours ago</span>
              <span className="admin-activity-text">New contact message from <strong>John Doe</strong>.</span>
            </li>
            <li>
              <span className="admin-activity-time">5 hours ago</span>
              <span className="admin-activity-text">You updated the product <strong>CloudSync Pro</strong>.</span>
            </li>
            <li>
              <span className="admin-activity-time">1 day ago</span>
              <span className="admin-activity-text">New application for <strong>UI/UX Designer</strong>.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
