import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import pool from '../config/db';

const router = Router();

// GET all services (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST new service (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, status, icon, desc, features } = req.body;
    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features;
    const result = await pool.query(
      'INSERT INTO services (title, status, icon, "desc", features) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, status || 'Active', icon, desc, featuresJson]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update service (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, status, icon, desc, features } = req.body;
    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features;
    const result = await pool.query(
      'UPDATE services SET title = COALESCE($1, title), status = COALESCE($2, status), icon = COALESCE($3, icon), "desc" = COALESCE($4, "desc"), features = COALESCE($5, features) WHERE id = $6 RETURNING *',
      [title, status, icon, desc, featuresJson, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE service (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM services WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
