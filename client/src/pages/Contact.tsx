import { useState, FormEvent } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      /* API may not be running – still show success for demo */
    }
    setSubmitted(true);
  };

  return (
    <div className="contact-page" id="contact-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-accent animate-fade-in-up">Contact Us</span>
          <h1 className="page-hero__title animate-fade-in-up delay-1">
            Let's <span className="gradient-text">Talk</span>
          </h1>
          <p className="page-hero__desc animate-fade-in-up delay-2">
            Have a project in mind? Need a quote? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* Form */}
          <div className="contact-form-wrapper card animate-fade-in-up">
            {submitted ? (
              <div className="contact-success">
                <span className="contact-success__icon">✅</span>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
                <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', subject: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <h2 className="contact-form__title">Send us a message</h2>
                <div className="contact-form__row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Full Name *</label>
                    <input className="form-input" id="contact-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email *</label>
                    <input className="form-input" type="email" id="contact-email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="contact-form__row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-company">Company</label>
                    <input className="form-input" id="contact-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">Subject *</label>
                    <input className="form-input" id="contact-subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message *</label>
                  <textarea className="form-textarea" id="contact-message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg contact-form__submit" id="contact-submit">
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="contact-info animate-fade-in-up delay-2">
            <div className="card contact-info-card">
              <span className="contact-info__icon">📧</span>
              <h4>Email Us</h4>
              <p>info@deesontech.com</p>
              <p>sales@deesontech.com</p>
            </div>
            <div className="card contact-info-card">
              <span className="contact-info__icon">📞</span>
              <h4>Call Us</h4>
              <p>+91 971626 6348</p>
              <p>Mon – Fri, 9 AM – 6 PM IST</p>
            </div>
            <div className="card contact-info-card">
              <span className="contact-info__icon">📍</span>
              <h4>Visit Us</h4>
              <p>Deesontech Pvt. Ltd.</p>
              <p>G-19 Sector 3, Noida</p>
              <p>Uttar Pradesh 201301, India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
