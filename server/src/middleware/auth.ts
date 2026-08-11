import { Request, Response, NextFunction } from 'express';

// Mock JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'deesontech_super_secret_key';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // In a real app, verify using jsonwebtoken
    // const decoded = jwt.verify(token, JWT_SECRET);
    if (token === 'mock-jwt-token') {
      (req as any).user = { email: 'admin@deesontech.com', role: 'admin' };
      next();
    } else {
      res.status(401).json({ error: 'Invalid token.' });
    }
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
