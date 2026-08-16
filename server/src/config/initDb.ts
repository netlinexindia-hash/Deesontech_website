import pool from './db';

export async function initDb(): Promise<void> {
  const client = await pool.connect();
  try {
    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        price VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Active',
        icon VARCHAR(50),
        badge VARCHAR(50),
        "desc" TEXT
      );

      ALTER TABLE products 
        ADD COLUMN IF NOT EXISTS icon VARCHAR(50),
        ADD COLUMN IF NOT EXISTS badge VARCHAR(50),
        ADD COLUMN IF NOT EXISTS "desc" TEXT;

      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Active',
        icon VARCHAR(50),
        "desc" TEXT,
        features JSONB
      );

      ALTER TABLE services
        ADD COLUMN IF NOT EXISTS icon VARCHAR(50),
        ADD COLUMN IF NOT EXISTS "desc" TEXT,
        ADD COLUMN IF NOT EXISTS features JSONB;

      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT,
        date DATE DEFAULT CURRENT_DATE,
        status VARCHAR(50) DEFAULT 'Unread'
      );

      CREATE TABLE IF NOT EXISTS careers (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(100),
        location VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Open'
      );
    `);

    // Seed products if empty
    const productsCount = await client.query('SELECT COUNT(*) FROM products');
    if (parseInt(productsCount.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO products (name, category, price, status, icon, badge, desc) VALUES
        ('CloudSync Pro', 'Cloud', '$299/mo', 'Active', '☁️', 'Popular', 'Enterprise-grade cloud synchronization platform for seamless data management across all your devices and teams.'),
        ('SecureVault', 'Security', '$199/mo', 'Active', '🔒', 'New', 'Military-grade encryption solution with zero-knowledge architecture protecting your most sensitive business data.'),
        ('DataFlow Analytics', 'Analytics', '$399/mo', 'Draft', '📊', 'Enterprise', 'Real-time BI dashboard with AI-powered insights, custom reports, and predictive analytics capabilities.')
      `);
      console.log('Seeded products table');
    }

    // Seed services if empty
    const servicesCount = await client.query('SELECT COUNT(*) FROM services');
    if (parseInt(servicesCount.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO services (title, status, icon, desc, features) VALUES
        ('Custom Software Development', 'Active', '🛠️', 'End-to-end software engineering, from requirements gathering and architecture design to development, testing, and deployment.', '["Full-stack Development", "Agile Methodology", "QA & Testing", "Post-launch Support"]'::jsonb),
        ('Cloud Solutions & Migration', 'Active', '☁️', 'Design, deploy, and manage cloud infrastructure on AWS, Azure, or Google Cloud.', '["Cloud Architecture", "Migration Strategy", "Cost Optimization", "Multi-cloud Management"]'::jsonb),
        ('Cybersecurity Services', 'Active', '🔐', 'Protect your business with comprehensive security assessments, penetration testing, and real-time threat monitoring.', '["Security Audits", "Pen Testing", "Compliance", "24/7 Monitoring"]'::jsonb),
        ('Blockchain Consulting', 'Draft', '🔗', 'Strategic technology advisory for digital transformation.', '["Tech Roadmaps", "Digital Transformation"]'::jsonb)
      `);
      console.log('Seeded services table');
    }

    // Seed contacts if empty
    const contactsCount = await client.query('SELECT COUNT(*) FROM contacts');
    if (parseInt(contactsCount.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO contacts (name, email, subject, message, date, status) VALUES
        ('Alice Smith', 'alice@example.com', 'CloudSync Pro inquiry', 'I would like a demo.', '2026-08-10', 'Unread'),
        ('Bob Johnson', 'bob@example.com', 'Custom development quote', 'Looking for a new app.', '2026-08-09', 'Read')
      `);
      console.log('Seeded contacts table');
    }

    // Seed careers if empty
    const careersCount = await client.query('SELECT COUNT(*) FROM careers');
    if (parseInt(careersCount.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO careers (title, department, location, status) VALUES
        ('Senior Full-Stack Developer', 'Engineering', 'Pune, India', 'Open'),
        ('Cloud Infrastructure Engineer', 'DevOps', 'Remote', 'Open'),
        ('UI/UX Designer', 'Design', 'Pune, India', 'Open'),
        ('Marketing Manager', 'Marketing', 'Remote', 'Closed')
      `);
      console.log('Seeded careers table');
    }

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}
