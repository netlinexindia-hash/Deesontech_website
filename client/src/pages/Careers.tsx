import { Link } from 'react-router-dom';
import './Careers.css';

const openings = [
  { id: 1, title: 'Senior Full-Stack Developer', department: 'Engineering', location: 'Pune, India', type: 'Full-time', desc: 'Build and maintain our core product platform using React, Node.js, and PostgreSQL. Lead technical decisions and mentor junior developers.' },
  { id: 2, title: 'Cloud Infrastructure Engineer', department: 'DevOps', location: 'Remote', type: 'Full-time', desc: 'Design and manage scalable cloud architectures on AWS and GCP. Implement CI/CD pipelines and infrastructure-as-code solutions.' },
  { id: 3, title: 'UI/UX Designer', department: 'Design', location: 'Pune, India', type: 'Full-time', desc: 'Create stunning, user-centered designs for our product suite. Conduct user research, build prototypes, and collaborate with engineering.' },
  { id: 4, title: 'Cybersecurity Analyst', department: 'Security', location: 'Bangalore, India', type: 'Full-time', desc: 'Monitor, detect, and respond to security threats. Conduct vulnerability assessments and ensure compliance with SOC 2 and ISO 27001.' },
  { id: 5, title: 'Product Manager', department: 'Product', location: 'Pune, India', type: 'Full-time', desc: 'Define product vision and roadmap. Work closely with engineering, design, and sales to deliver features that delight customers.' },
  { id: 6, title: 'Sales Development Representative', department: 'Sales', location: 'Remote', type: 'Full-time', desc: 'Generate new business opportunities through outbound prospecting. Qualify leads and set up demos for the account executive team.' },
];

const perks = [
  { icon: '🏠', title: 'Remote Flexibility', desc: 'Work from home or our offices – your choice.' },
  { icon: '📚', title: 'Learning Budget', desc: '₹1,00,000/year for courses, conferences, books.' },
  { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive health coverage for you and family.' },
  { icon: '🎯', title: 'Stock Options', desc: 'Equity in a fast-growing tech company.' },
  { icon: '🌴', title: 'Generous PTO', desc: '30 days paid leave + public holidays.' },
  { icon: '🍕', title: 'Team Events', desc: 'Quarterly offsites, hackathons, and social events.' },
];

export default function Careers() {
  return (
    <div className="careers-page" id="careers-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-accent animate-fade-in-up">Careers</span>
          <h1 className="page-hero__title animate-fade-in-up delay-1">
            Join Our <span className="gradient-text">Team</span>
          </h1>
          <p className="page-hero__desc animate-fade-in-up delay-2">
            Help us build the future of IT. We're looking for passionate people who want to make an impact.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="section careers-perks-section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-primary">Why Deesontech?</span>
            <h2 className="section-title">Perks & <span className="gradient-text">Benefits</span></h2>
          </div>
          <div className="careers-perks-grid">
            {perks.map((p, i) => (
              <div key={i} className={`card careers-perk animate-fade-in-up delay-${(i % 3) + 1}`}>
                <span className="careers-perk__icon">{p.icon}</span>
                <h3 className="careers-perk__title">{p.title}</h3>
                <p className="careers-perk__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-accent">Open Positions</span>
            <h2 className="section-title">Current <span className="gradient-text">Openings</span></h2>
            <p className="section-subtitle">We're hiring across multiple departments. Find your fit below.</p>
          </div>
          <div className="careers-list">
            {openings.map((job, i) => (
              <div key={job.id} className={`card careers-job animate-fade-in-up delay-${(i % 3) + 1}`}>
                <div className="careers-job__top">
                  <div>
                    <h3 className="careers-job__title">{job.title}</h3>
                    <div className="careers-job__meta">
                      <span className="badge badge-primary">{job.department}</span>
                      <span className="careers-job__location">📍 {job.location}</span>
                      <span className="careers-job__type">🕐 {job.type}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="btn btn-primary btn-sm">Apply →</Link>
                </div>
                <p className="careers-job__desc">{job.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
