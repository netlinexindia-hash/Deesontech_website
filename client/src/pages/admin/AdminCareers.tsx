import { useState } from 'react';
import './AdminDashboard.css';

export default function AdminCareers() {
  const [jobs] = useState([
    { id: 1, title: 'Senior Full-Stack Developer', department: 'Engineering', location: 'Pune, India', status: 'Open' },
    { id: 2, title: 'Cloud Infrastructure Engineer', department: 'DevOps', location: 'Remote', status: 'Open' },
    { id: 3, title: 'UI/UX Designer', department: 'Design', location: 'Pune, India', status: 'Open' },
    { id: 4, title: 'Marketing Manager', department: 'Marketing', location: 'Remote', status: 'Closed' },
  ]);

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Careers</h1>
        <p className="admin-page__subtitle">Manage job postings and open positions.</p>
        <div className="admin-page__actions">
          <button className="btn btn-primary" id="add-job-btn">+ Add Job Posting</button>
        </div>
      </div>

      <div className="card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td><strong>{job.title}</strong></td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>
                    <span className={`badge ${job.status === 'Open' ? 'badge-accent' : 'badge-secondary'}`} style={job.status !== 'Open' ? { background: 'var(--color-bg-secondary)' } : {}}>
                      {job.status}
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
