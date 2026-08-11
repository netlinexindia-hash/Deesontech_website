import { useState } from 'react';
import './AdminDashboard.css';

export default function AdminServices() {
  const [services] = useState([
    { id: 1, title: 'Custom Software Development', status: 'Active' },
    { id: 2, title: 'Cloud Solutions & Migration', status: 'Active' },
    { id: 3, title: 'Cybersecurity Services', status: 'Active' },
    { id: 4, title: 'Blockchain Consulting', status: 'Draft' },
  ]);

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Services</h1>
        <p className="admin-page__subtitle">Manage the IT services you offer.</p>
        <div className="admin-page__actions">
          <button className="btn btn-primary" id="add-service-btn">+ Add Service</button>
        </div>
      </div>

      <div className="card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.title}</strong></td>
                  <td>
                    <span className={`badge ${s.status === 'Active' ? 'badge-accent' : 'badge-warning'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-secondary btn-sm">Edit</button>
                      <button className="btn btn-secondary btn-sm" style={{ color: 'var(--color-error)' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
