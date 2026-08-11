import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Mock database
let products = [
  { id: 1, name: 'CloudSync Pro', category: 'Cloud', price: '$299/mo', status: 'Active' },
  { id: 2, name: 'SecureVault', category: 'Security', price: '$199/mo', status: 'Active' },
  { id: 3, name: 'DataFlow Analytics', category: 'Analytics', price: '$399/mo', status: 'Draft' },
];

// GET all products (public)
router.get('/', (req: Request, res: Response) => {
  res.json(products);
});

// POST new product (protected)
router.post('/', authMiddleware, (req: Request, res: Response) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product (protected)
router.put('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product (protected)
router.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.status(204).send();
});

export default router;
