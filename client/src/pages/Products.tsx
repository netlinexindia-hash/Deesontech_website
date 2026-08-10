import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const categories = ['All', 'Cloud', 'Security', 'Analytics', 'Communication', 'DevOps'];

const allProducts = [
  { id: 1, name: 'CloudSync Pro', category: 'Cloud', price: '$299/mo', icon: '☁️', badge: 'Popular', desc: 'Enterprise-grade cloud synchronization platform for seamless data management across all your devices and teams.' },
  { id: 2, name: 'SecureVault', category: 'Security', price: '$199/mo', icon: '🔒', badge: 'New', desc: 'Military-grade encryption solution with zero-knowledge architecture protecting your most sensitive business data.' },
  { id: 3, name: 'DataFlow Analytics', category: 'Analytics', price: '$399/mo', icon: '📊', badge: 'Enterprise', desc: 'Real-time BI dashboard with AI-powered insights, custom reports, and predictive analytics capabilities.' },
  { id: 4, name: 'TeamHub', category: 'Communication', price: '$49/mo', icon: '💬', badge: 'Startup', desc: 'All-in-one team communication platform with video calls, messaging, file sharing, and project boards.' },
  { id: 5, name: 'DeployPilot', category: 'DevOps', price: '$249/mo', icon: '🚀', badge: 'New', desc: 'Automated CI/CD pipeline manager with one-click deployments, rollback, and infrastructure-as-code support.' },
  { id: 6, name: 'ShieldGuard', category: 'Security', price: '$349/mo', icon: '🛡️', badge: 'Enterprise', desc: 'Advanced threat detection and response system with 24/7 monitoring, SIEM integration, and compliance tools.' },
  { id: 7, name: 'CloudStore', category: 'Cloud', price: '$99/mo', icon: '💾', badge: 'Starter', desc: 'Scalable object storage solution with global CDN, versioning, and lifecycle management for any file type.' },
  { id: 8, name: 'InsightIQ', category: 'Analytics', price: '$179/mo', icon: '🧠', badge: 'AI', desc: 'AI-driven customer analytics platform that uncovers behavioral patterns and predicts churn before it happens.' },
  { id: 9, name: 'PipelineX', category: 'DevOps', price: '$199/mo', icon: '⚙️', badge: 'Popular', desc: 'Container orchestration and microservices management platform built for cloud-native development teams.' },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="products-page" id="products-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-primary animate-fade-in-up">Our Products</span>
          <h1 className="page-hero__title animate-fade-in-up delay-1">
            Software <span className="gradient-text">Products</span>
          </h1>
          <p className="page-hero__desc animate-fade-in-up delay-2">
            Explore our suite of enterprise-ready software solutions designed to power every aspect of your business.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section">
        <div className="container">
          <div className="products-filter animate-fade-in-up" id="product-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`products-filter__btn ${activeCategory === cat ? 'products-filter__btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="products-catalog">
            {filtered.map((product, i) => (
              <div key={product.id} className={`product-card card animate-fade-in-up delay-${(i % 3) + 1}`}>
                <div className="product-card__header">
                  <span className="product-card__icon">{product.icon}</span>
                  <span className="badge badge-primary">{product.badge}</span>
                </div>
                <h3 className="product-card__name">{product.name}</h3>
                <span className="product-card__category">{product.category}</span>
                <p className="product-card__desc">{product.description || product.desc}</p>
                <div className="product-card__footer">
                  <span className="product-card__price">{product.price}</span>
                  <Link to="/contact" className="btn btn-primary btn-sm">
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="products-empty">No products found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
