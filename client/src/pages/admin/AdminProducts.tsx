import { useState, FormEvent } from 'react';
import { useProducts, Product } from '../../context/ProductsContext';
import './AdminDashboard.css';
import './AdminProducts.css';

const emptyForm: Omit<Product, 'id'> = {
  name: '', category: '', price: '', status: 'Draft', icon: '📦', badge: '', desc: '',
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyForm);

  /* ---------- helpers ---------- */
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ name: p.name, category: p.category, price: p.price, status: p.status, icon: p.icon, badge: p.badge, desc: p.desc });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      updateProduct(editingId, form);
    } else {
      addProduct(form);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="admin-page animate-fade-in-up">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Products</h1>
        <p className="admin-page__subtitle">Manage your software product catalog.</p>
        <div className="admin-page__actions">
          <button className="btn btn-primary" id="add-product-btn" onClick={openAdd}>
            + Add Product
          </button>
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
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ color: 'var(--color-error)' }}
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                    No products yet. Click "+ Add Product" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- Modal ---------- */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal glass-card animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal__title">
              {editingId !== null ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="admin-modal__form">
              <div className="form-group">
                <label className="form-label" htmlFor="product-name">Product Name</label>
                <input
                  className="form-input"
                  id="product-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. CloudSync Pro"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-category">Category</label>
                <input
                  className="form-input"
                  id="product-category"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Cloud, Security, Analytics"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-price">Price</label>
                <input
                  className="form-input"
                  id="product-price"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g. $299/mo"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-icon">Icon (emoji)</label>
                <input
                  className="form-input"
                  id="product-icon"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="e.g. ☁️"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-badge">Badge</label>
                <input
                  className="form-input"
                  id="product-badge"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="e.g. Popular, New, Enterprise"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-desc">Description</label>
                <textarea
                  className="form-textarea"
                  id="product-desc"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Brief product description..."
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-status">Status</label>
                <select
                  className="form-input"
                  id="product-status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as 'Active' | 'Draft' })}
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                </select>
              </div>
              <div className="admin-modal__actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId !== null ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
