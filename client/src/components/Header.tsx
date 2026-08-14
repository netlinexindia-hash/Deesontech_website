import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/careers', label: 'Careers' },
];

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="main-header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" id="logo-link">
          <span className="header__logo-icon">⬡</span>
          <span className="header__logo-text">Deeson<span className="gradient-text">tech</span></span>
        </Link>

        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`} id="main-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`header__link ${location.pathname === link.path ? 'header__link--active' : ''}`}
              id={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}

        </nav>

        <button
          className={`header__burger ${mobileOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="burger-menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
