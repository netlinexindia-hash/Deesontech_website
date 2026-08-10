import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    icon: '🛠️',
    title: 'Custom Software Development',
    desc: 'End-to-end software engineering, from requirements gathering and architecture design to development, testing, and deployment. We build scalable web, mobile, and desktop applications tailored to your workflow.',
    features: ['Full-stack Development', 'Agile Methodology', 'QA & Testing', 'Post-launch Support'],
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions & Migration',
    desc: 'Design, deploy, and manage cloud infrastructure on AWS, Azure, or Google Cloud. We handle seamless migration with zero downtime and ongoing optimization for cost and performance.',
    features: ['Cloud Architecture', 'Migration Strategy', 'Cost Optimization', 'Multi-cloud Management'],
  },
  {
    icon: '🔐',
    title: 'Cybersecurity Services',
    desc: 'Protect your business with comprehensive security assessments, penetration testing, and real-time threat monitoring. We ensure compliance with industry regulations (SOC 2, ISO 27001, GDPR).',
    features: ['Security Audits', 'Pen Testing', 'Compliance', '24/7 Monitoring'],
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'Build high-performance native and cross-platform mobile apps for iOS and Android. From consumer-facing apps to enterprise mobility solutions, we deliver exceptional user experiences.',
    features: ['iOS & Android', 'React Native / Flutter', 'UI/UX Design', 'App Store Optimization'],
  },
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'Harness the power of artificial intelligence. We build custom ML models, NLP solutions, computer vision systems, and intelligent chatbots that drive real business outcomes.',
    features: ['Custom ML Models', 'NLP & Chat Bots', 'Computer Vision', 'Predictive Analytics'],
  },
  {
    icon: '🔗',
    title: 'IT Consulting & Strategy',
    desc: 'Strategic technology advisory for digital transformation. We assess your IT landscape, define roadmaps, and guide technology adoption to align with your business objectives.',
    features: ['Tech Roadmaps', 'Digital Transformation', 'Vendor Selection', 'Process Automation'],
  },
];

export default function Services() {
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
          {services.map((service, i) => (
            <div key={i} className={`service-detail card animate-fade-in-up delay-${(i % 3) + 1}`}>
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
                  {service.features.map((f, j) => (
                    <li key={j} className="service-detail__feature">
                      <span className="service-detail__check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
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
