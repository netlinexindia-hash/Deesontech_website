import { Link } from 'react-router-dom';
import './Home.css';

const featuredProducts = [
  {
    id: 1,
    name: 'CloudSync Pro',
    description: 'Enterprise-grade cloud synchronization platform for seamless data management across all your devices.',
    price: '$299/mo',
    badge: 'Popular',
    icon: '☁️',
  },
  {
    id: 2,
    name: 'SecureVault',
    description: 'Military-grade encryption solution protecting your business data with zero-knowledge architecture.',
    price: '$199/mo',
    badge: 'New',
    icon: '🔒',
  },
  {
    id: 3,
    name: 'DataFlow Analytics',
    description: 'Real-time business intelligence dashboard with AI-powered insights and predictive analytics.',
    price: '$399/mo',
    badge: 'Enterprise',
    icon: '📊',
  },
];

const services = [
  { icon: '🛠️', title: 'Custom Software Development', desc: 'Tailor-made solutions built to fit your unique business requirements.' },
  { icon: '☁️', title: 'Cloud Infrastructure', desc: 'Scalable, reliable cloud architecture design and migration services.' },
  { icon: '🔐', title: 'Cybersecurity', desc: 'Comprehensive security audits, penetration testing, and threat mitigation.' },
  { icon: '📱', title: 'Mobile App Development', desc: 'Native and cross-platform mobile applications for iOS and Android.' },
];

const stats = [
  { value: '250+', label: 'Projects Delivered' },
  { value: '120+', label: 'Happy Clients' },
  { value: '50+', label: 'Team Members' },
  { value: '99.9%', label: 'Uptime SLA' },
];

export default function Home() {
  return (
    <div className="home" id="home-page">
      {/* -------- HERO -------- */}
      <section className="hero" id="hero-section">
        <div className="hero__bg-grid" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />

        <div className="container hero__content">
          <div className="hero__text animate-fade-in-up">
            <span className="badge badge-primary">🚀 Next-Gen IT Solutions</span>
            <h1 className="hero__title">
              Transform Your Business with{' '}
              <span className="gradient-text">Cutting-Edge Technology</span>
            </h1>
            <p className="hero__subtitle">
              We build premium software products and deliver world-class IT services
              that empower businesses to scale, innovate, and dominate their markets.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn-primary btn-lg" id="hero-cta-products">
                Explore Products
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg" id="hero-cta-contact">
                Get a Free Consultation
              </Link>
            </div>
          </div>

          <div className="hero__visual animate-fade-in-up delay-2">
            <div className="hero__card-stack">
              <div className="hero__float-card hero__float-card--1 glass-card">
                <span className="hero__float-icon">⚡</span>
                <div>
                  <p className="hero__float-title">Lightning Fast</p>
                  <p className="hero__float-desc">99.9% uptime guaranteed</p>
                </div>
              </div>
              <div className="hero__float-card hero__float-card--2 glass-card">
                <span className="hero__float-icon">🔒</span>
                <div>
                  <p className="hero__float-title">Enterprise Security</p>
                  <p className="hero__float-desc">SOC 2 Type II Compliant</p>
                </div>
              </div>
              <div className="hero__float-card hero__float-card--3 glass-card">
                <span className="hero__float-icon">🌐</span>
                <div>
                  <p className="hero__float-title">Global Scale</p>
                  <p className="hero__float-desc">Deployed in 50+ regions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- STATS -------- */}
      <section className="stats section" id="stats-section">
        <div className="container stats__grid">
          {stats.map((s, i) => (
            <div key={i} className={`stats__item animate-fade-in-up delay-${i + 1}`}>
              <span className="stats__value gradient-text">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -------- FEATURED PRODUCTS -------- */}
      <section className="section" id="featured-products-section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-accent">Our Products</span>
            <h2 className="section-title">
              Software Built for <span className="gradient-text">Modern Business</span>
            </h2>
            <p className="section-subtitle">
              Discover our suite of enterprise-ready software solutions designed to
              accelerate your digital transformation.
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className={`product-card card animate-fade-in-up delay-${i + 1}`}>
                <div className="product-card__header">
                  <span className="product-card__icon">{product.icon}</span>
                  <span className="badge badge-primary">{product.badge}</span>
                </div>
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__desc">{product.description}</p>
                <div className="product-card__footer">
                  <span className="product-card__price">{product.price}</span>
                  <Link to="/products" className="btn btn-secondary btn-sm">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta animate-fade-in-up">
            <Link to="/products" className="btn btn-primary" id="view-all-products">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* -------- SERVICES OVERVIEW -------- */}
      <section className="section services-home" id="services-overview-section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-accent">Our Services</span>
            <h2 className="section-title">
              End-to-End <span className="gradient-text">IT Services</span>
            </h2>
            <p className="section-subtitle">
              From ideation to deployment and beyond, we partner with you at every stage of your technology journey.
            </p>
          </div>

          <div className="services-home__grid">
            {services.map((service, i) => (
              <div key={i} className={`services-home__card card animate-fade-in-up delay-${i + 1}`}>
                <span className="services-home__icon">{service.icon}</span>
                <h3 className="services-home__title">{service.title}</h3>
                <p className="services-home__desc">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-cta animate-fade-in-up">
            <Link to="/services" className="btn btn-primary" id="view-all-services">
              Explore All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* -------- CTA BANNER -------- */}
      <section className="cta-banner section" id="cta-section">
        <div className="container">
          <div className="cta-banner__inner glass-card animate-fade-in-up">
            <h2 className="cta-banner__title">
              Ready to <span className="gradient-text">Elevate</span> Your Business?
            </h2>
            <p className="cta-banner__desc">
              Let's discuss how our software and services can transform your operations. Schedule a free consultation today.
            </p>
            <div className="cta-banner__actions">
              <Link to="/contact" className="btn btn-accent btn-lg" id="cta-contact">
                Get Started →
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg" id="cta-about">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
