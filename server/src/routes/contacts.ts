import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import pool from '../config/db';

const router = Router();

// POST new contact message (public)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    await pool.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject, message]
    );
    res.status(201).json({ message: 'Contact message received successfully.' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET all contact messages (protected)
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update contact message status (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE contacts SET status = COALESCE($1, status) WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
