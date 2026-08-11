import { useState } from 'react';
import './AdminDashboard.css';

export default function AdminContacts() {
  const [messages] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', subject: 'CloudSync Pro inquiry', date: '2026-08-10', status: 'Unread' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', subject: 'Custom development quote', date: '2026-08-09', status: 'Read' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', subject: 'Partnership opportunity', date: '2026-08-08', status: 'Read' },
  ]);

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Contact Submissions</h1>
        <p className="admin-page__subtitle">View and manage messages from the website contact form.</p>
      </div>

      <div className="card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} style={{ fontWeight: m.status === 'Unread' ? 'bold' : 'normal' }}>
                  <td>{m.date}</td>
                  <td>{m.name}</td>
                  <td><a href={`mailto:${m.email}`}>{m.email}</a></td>
                  <td>{m.subject}</td>
                  <td>
                    <span className={`badge ${m.status === 'Unread' ? 'badge-primary' : 'badge-secondary'}`} style={m.status !== 'Unread' ? { background: 'var(--color-bg-secondary)' } : {}}>
                      {m.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-secondary btn-sm">View</button>
                      {m.status === 'Unread' && (
                        <button className="btn btn-secondary btn-sm">Mark Read</button>
                      )}
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
