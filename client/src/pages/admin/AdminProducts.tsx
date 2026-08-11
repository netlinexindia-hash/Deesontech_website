import { useState } from 'react';
import './AdminDashboard.css';

export default function AdminProducts() {
  const [products] = useState([
    { id: 1, name: 'CloudSync Pro', category: 'Cloud', price: '$299/mo', status: 'Active' },
    { id: 2, name: 'SecureVault', category: 'Security', price: '$199/mo', status: 'Active' },
    { id: 3, name: 'DataFlow Analytics', category: 'Analytics', price: '$399/mo', status: 'Draft' },
  ]);

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Products</h1>
        <p className="admin-page__subtitle">Manage your software product catalog.</p>
        <div className="admin-page__actions">
          <button className="btn btn-primary" id="add-product-btn">+ Add Product</button>
        </div>
      </div>

      <div className="card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td><span className="badge badge-primary">{p.category}</span></td>
                  <td>{p.price}</td>
                  <td>
                    <span className={`badge ${p.status === 'Active' ? 'badge-accent' : 'badge-warning'}`}>
                      {p.status}
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
