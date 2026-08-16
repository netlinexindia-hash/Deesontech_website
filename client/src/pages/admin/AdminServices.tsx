import { useState, FormEvent } from 'react';
import { useServices, Service } from '../../context/ServicesContext';
import './AdminDashboard.css';

const emptyForm: Omit<Service, 'id'> = {
  title: '', status: 'Draft', icon: '✨', desc: '', features: []
};

export default function AdminServices() {
  const { services, addService, updateService, deleteService } = useServices();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Service, 'id'>>(emptyForm);
  const [featuresInput, setFeaturesInput] = useState('');

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFeaturesInput('');
    setShowModal(true);
  };

  const openEdit = (s: Service) => {
    setEditingId(s.id);
    setForm({ title: s.title, status: s.status, icon: s.icon, desc: s.desc, features: s.features });
    setFeaturesInput(s.features ? s.features.join('\n') : '');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalForm = {
      ...form,
      features: featuresInput.split('\n').map(f => f.trim()).filter(f => f !== '')
    };
    if (editingId !== null) {
      updateService(editingId, finalForm);
    } else {
      addService(finalForm);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
    }
  };

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Services</h1>
        <p className="admin-page__subtitle">Manage the IT services you offer.</p>
        <div className="admin-page__actions">
          <button className="btn btn-primary" id="add-service-btn" onClick={openAdd}>
            + Add Service
          </button>
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
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(s)}>Edit</button>
                      <button className="btn btn-secondary btn-sm" style={{ color: 'var(--color-error)' }} onClick={() => handleDelete(s.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                    No services yet. Click "+ Add Service" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal glass-card animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal__title">
              {editingId !== null ? 'Edit Service' : 'Add Service'}
            </h2>
            <form onSubmit={handleSubmit} className="admin-modal__form">
              <div className="form-group">
                <label className="form-label" htmlFor="service-title">Service Title</label>
                <input
                  className="form-input"
                  id="service-title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Custom Software Development"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="service-icon">Icon (emoji)</label>
                <input
                  className="form-input"
                  id="service-icon"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="e.g. 🛠️"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="service-desc">Description</label>
                <textarea
                  className="form-textarea"
                  id="service-desc"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Brief service description..."
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="service-features">Features (One per line)</label>
                <textarea
                  className="form-textarea"
                  id="service-features"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Full-stack Development&#10;Agile Methodology"
                  style={{ minHeight: '100px' }}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="service-status">Status</label>
                <select
                  className="form-input"
                  id="service-status"
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
                  {editingId !== null ? 'Save Changes' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
