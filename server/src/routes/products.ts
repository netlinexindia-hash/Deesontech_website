import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import pool from '../config/db';

const router = Router();

// GET all products (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST new product (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, category, price, status } = req.body;
    const result = await pool.query(
      'INSERT INTO products (name, category, price, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, category, price, status || 'Active']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update product (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, category, price, status } = req.body;
    const result = await pool.query(
      'UPDATE products SET name = COALESCE($1, name), category = COALESCE($2, category), price = COALESCE($3, price), status = COALESCE($4, status) WHERE id = $5 RETURNING *',
      [name, category, price, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE product (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
