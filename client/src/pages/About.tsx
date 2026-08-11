import './About.css';

const team = [
  { name: 'Rajesh Kumar', role: 'CEO & Founder', avatar: 'RK' },
  { name: 'Priya Sharma', role: 'CTO', avatar: 'PS' },
  { name: 'Amit Patel', role: 'VP of Engineering', avatar: 'AP' },
  { name: 'Sneha Reddy', role: 'Head of Design', avatar: 'SR' },
];

const values = [
  { icon: '💡', title: 'Innovation First', desc: 'We push boundaries and embrace emerging technologies to deliver solutions that keep you ahead of the curve.' },
  { icon: '🤝', title: 'Client Partnership', desc: "We don't just build software – we become an extension of your team, invested in your long-term success." },
  { icon: '🎯', title: 'Quality Obsession', desc: 'Every line of code, every design pixel, every deployment is held to the highest standards of excellence.' },
  { icon: '🌱', title: 'Continuous Growth', desc: 'We foster a culture of learning, mentorship, and career development for our team and our clients.' },
];

const timeline = [
  { year: '2020', event: 'Founded in Pune, India with a vision to democratize enterprise technology.' },
  { year: '2021', event: 'Launched CloudSync Pro and onboarded 50+ enterprise clients.' },
  { year: '2022', event: 'Expanded team to 50+ engineers. Opened second office in Bangalore.' },
  { year: '2023', event: 'Released SecureVault & DataFlow Analytics. Crossed 100+ clients globally.' },
  { year: '2024', event: 'SOC 2 Type II certification achieved. Strategic partnerships with AWS & Microsoft.' },
];

export default function About() {
  return (
    <div className="about-page" id="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge badge-accent animate-fade-in-up">About Us</span>
          <h1 className="page-hero__title animate-fade-in-up delay-1">
            Building the <span className="gradient-text">Future of IT</span>
          </h1>
          <p className="page-hero__desc animate-fade-in-up delay-2">
            We are a team of passionate technologists on a mission to empower businesses
            with innovative software and world-class IT services.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container about-story">
          <div className="about-story__content animate-fade-in-up">
            <h2 className="section-title">Our <span className="gradient-text">Story</span></h2>
            <p>
              Deesontech was founded in 2020 with a bold vision: to bridge the gap between
              enterprise-grade technology and growing businesses. Too often, small and mid-sized
              companies were forced to choose between outdated off-the-shelf tools or prohibitively
              expensive custom solutions.
            </p>
            <p>
              We set out to change that. Today, our suite of software products serves 120+ clients
              worldwide, and our consulting team has delivered 250+ successful IT projects across
              industries ranging from fintech to healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values-section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-primary">Our Values</span>
            <h2 className="section-title">What <span className="gradient-text">Drives Us</span></h2>
          </div>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={i} className={`card about-value-card animate-fade-in-up delay-${i + 1}`}>
                <span className="about-value-icon">{v.icon}</span>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-accent">Our Journey</span>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="about-timeline">
            {timeline.map((t, i) => (
              <div key={i} className={`about-timeline__item animate-fade-in-up delay-${(i % 4) + 1}`}>
                <div className="about-timeline__dot" />
                <div className="about-timeline__content">
                  <span className="about-timeline__year gradient-text">{t.year}</span>
                  <p className="about-timeline__event">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team-section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="badge badge-primary">Leadership</span>
            <h2 className="section-title">Meet Our <span className="gradient-text">Team</span></h2>
          </div>
          <div className="about-team-grid">
            {team.map((member, i) => (
              <div key={i} className={`card about-team-card animate-fade-in-up delay-${i + 1}`}>
                <div className="about-team-avatar">{member.avatar}</div>
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
