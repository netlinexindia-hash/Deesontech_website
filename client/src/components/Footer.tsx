import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        {/* Top row */}
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">⬡</span>
              Deeson<span className="gradient-text">tech</span>
            </Link>
            <p className="footer__tagline">
              Empowering businesses with cutting-edge software products and IT services since 2021.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="LinkedIn">in</a>
              <a href="#" className="footer__social" aria-label="Twitter">𝕏</a>
              <a href="#" className="footer__social" aria-label="GitHub">GH</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h4 className="footer__heading">Quick Links</h4>
            <Link to="/" className="footer__link">Home</Link>
            <Link to="/products" className="footer__link">Products</Link>
            <Link to="/services" className="footer__link">Services</Link>
            <Link to="/about" className="footer__link">About Us</Link>
          </div>

          {/* Company */}
          <div className="footer__column">
            <h4 className="footer__heading">Company</h4>
            <Link to="/careers" className="footer__link">Careers</Link>
            <Link to="/contact" className="footer__link">Contact</Link>
            <a href="#" className="footer__link">Privacy Policy</a>
            <a href="#" className="footer__link">Terms of Service</a>
          </div>

          {/* Contact Info */}
          <div className="footer__column">
            <h4 className="footer__heading">Contact Us</h4>
            <p className="footer__info">📧 info@deesontech.com</p>
            <p className="footer__info">📞 +91 97162 66348 </p>
            <p className="footer__info">📍 G-19 Sec 3, Noida, India</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Deesontech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
