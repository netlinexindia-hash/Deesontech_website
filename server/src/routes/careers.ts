import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import pool from '../config/db';

const router = Router();

// GET all jobs (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM careers ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching careers:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST new job (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, department, location, status } = req.body;
    const result = await pool.query(
      'INSERT INTO careers (title, department, location, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, department, location, status || 'Open']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update job (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, department, location, status } = req.body;
    const result = await pool.query(
      'UPDATE careers SET title = COALESCE($1, title), department = COALESCE($2, department), location = COALESCE($3, location), status = COALESCE($4, status) WHERE id = $5 RETURNING *',
      [title, department, location, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE job (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM careers WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
