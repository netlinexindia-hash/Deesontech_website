import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Deesontech API is running' });
});

// Placeholder for routes that will be implemented later
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === 'admin@deesontech.com' && password === 'admin123') {
    return res.json({ token: 'mock-jwt-token', user: { email, role: 'admin' } });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/contacts', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Contact message received successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
