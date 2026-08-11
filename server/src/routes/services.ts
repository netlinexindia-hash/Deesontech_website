import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Mock database
let services = [
  { id: 1, title: 'Custom Software Development', status: 'Active' },
  { id: 2, title: 'Cloud Solutions & Migration', status: 'Active' },
  { id: 3, title: 'Cybersecurity Services', status: 'Active' },
  { id: 4, title: 'Blockchain Consulting', status: 'Draft' },
];

// GET all services (public)
router.get('/', (req: Request, res: Response) => {
  res.json(services);
});

// POST new service (protected)
router.post('/', authMiddleware, (req: Request, res: Response) => {
  const newService = {
    id: services.length + 1,
    ...req.body
  };
  services.push(newService);
  res.status(201).json(newService);
});

// PUT update service (protected)
router.put('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = services.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Service not found' });
  
  services[index] = { ...services[index], ...req.body };
  res.json(services[index]);
});

// DELETE service (protected)
router.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  services = services.filter(s => s.id !== id);
  res.status(204).send();
});

export default router;
