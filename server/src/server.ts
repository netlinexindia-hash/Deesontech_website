import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productsRoutes from './routes/products';
import servicesRoutes from './routes/services';
import contactsRoutes from './routes/contacts';
import careersRoutes from './routes/careers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Deesontech API is running' });
});

// Auth route
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === 'admin@deesontech.com' && password === 'admin123') {
    return res.json({ token: 'mock-jwt-token', user: { email, role: 'admin' } });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Register API Routes
app.use('/api/products', productsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/careers', careersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
