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
        status VARCHAR(50) DEFAULT 'Active'
      );

      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Active'
      );

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
        INSERT INTO products (name, category, price, status) VALUES
        ('CloudSync Pro', 'Cloud', '$299/mo', 'Active'),
        ('SecureVault', 'Security', '$199/mo', 'Active'),
        ('DataFlow Analytics', 'Analytics', '$399/mo', 'Draft')
      `);
      console.log('Seeded products table');
    }

    // Seed services if empty
    const servicesCount = await client.query('SELECT COUNT(*) FROM services');
    if (parseInt(servicesCount.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO services (title, status) VALUES
        ('Custom Software Development', 'Active'),
        ('Cloud Solutions & Migration', 'Active'),
        ('Cybersecurity Services', 'Active'),
        ('Blockchain Consulting', 'Draft')
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
