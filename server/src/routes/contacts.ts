import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Mock database
let messages = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', subject: 'CloudSync Pro inquiry', message: 'I would like a demo.', date: '2026-08-10', status: 'Unread' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', subject: 'Custom development quote', message: 'Looking for a new app.', date: '2026-08-09', status: 'Read' },
];

// POST new contact message (public)
router.post('/', (req: Request, res: Response) => {
  const newMessage = {
    id: messages.length + 1,
    date: new Date().toISOString().split('T')[0],
    status: 'Unread',
    ...req.body
  };
  messages.push(newMessage);
  res.status(201).json({ message: 'Contact message received successfully.' });
});

// GET all contact messages (protected)
router.get('/', authMiddleware, (req: Request, res: Response) => {
  res.json(messages);
});

// PUT update contact message status (protected)
router.put('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Message not found' });
  
  messages[index] = { ...messages[index], ...req.body };
  res.json(messages[index]);
});

export default router;
