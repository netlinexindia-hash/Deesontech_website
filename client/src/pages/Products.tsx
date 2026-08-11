import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import './Products.css';

const categories = ['All', 'Cloud', 'Security', 'Analytics', 'Communication', 'DevOps'];

export default function Products() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');

  // Only show Active products on the public page
  const activeProducts = products.filter((p) => p.status === 'Active');

  const filtered = activeCategory === 'All'
    ? activeProducts
    : activeProducts.filter((p) => p.category === activeCategory);

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
                  {product.badge && <span className="badge badge-primary">{product.badge}</span>}
                </div>
                <h3 className="product-card__name">{product.name}</h3>
                <span className="product-card__category">{product.category}</span>
                <p className="product-card__desc">{product.desc}</p>
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
