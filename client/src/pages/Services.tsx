import { Link } from 'react-router-dom';
import { useServices } from '../context/ServicesContext';
import './Services.css';

export default function Services() {
  const { services } = useServices();

  const activeServices = services.filter((s) => s.status === 'Active');

  return (
    <div className="services-page" id="services-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-accent animate-fade-in-up">Our Services</span>
          <h1 className="page-hero__title animate-fade-in-up delay-1">
            IT <span className="gradient-text">Services</span>
          </h1>
          <p className="page-hero__desc animate-fade-in-up delay-2">
            Comprehensive IT solutions spanning development, cloud, security, and strategy to fuel your growth.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section">
        <div className="container services-list">
          {activeServices.map((service, i) => (
            <div key={service.id} className={`service-detail card animate-fade-in-up delay-${(i % 3) + 1}`}>
              <div className="service-detail__left">
                <span className="service-detail__icon">{service.icon}</span>
                <h2 className="service-detail__title">{service.title}</h2>
                <p className="service-detail__desc">{service.desc}</p>
                <Link to="/contact" className="btn btn-primary btn-sm">
                  Request Quote →
                </Link>
              </div>
              <div className="service-detail__right">
                <h4 className="service-detail__features-label">What's Included</h4>
                <ul className="service-detail__features">
                  {service.features?.map((f, j) => (
                    <li key={j} className="service-detail__feature">
                      <span className="service-detail__check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {activeServices.length === 0 && (
             <p className="products-empty" style={{textAlign: 'center', width: '100%'}}>No active services found.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner__inner glass-card animate-fade-in-up" style={{ textAlign: 'center' }}>
            <h2 className="cta-banner__title">Need a Custom Solution?</h2>
            <p className="cta-banner__desc">
              Every business is unique. Let's talk about what you need and build the perfect solution together.
            </p>
            <Link to="/contact" className="btn btn-accent btn-lg" id="services-cta">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
