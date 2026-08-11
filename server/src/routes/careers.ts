import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Mock database
let jobs = [
  { id: 1, title: 'Senior Full-Stack Developer', department: 'Engineering', location: 'Pune, India', status: 'Open' },
  { id: 2, title: 'Cloud Infrastructure Engineer', department: 'DevOps', location: 'Remote', status: 'Open' },
  { id: 3, title: 'UI/UX Designer', department: 'Design', location: 'Pune, India', status: 'Open' },
  { id: 4, title: 'Marketing Manager', department: 'Marketing', location: 'Remote', status: 'Closed' },
];

// GET all jobs (public)
router.get('/', (req: Request, res: Response) => {
  res.json(jobs);
});

// POST new job (protected)
router.post('/', authMiddleware, (req: Request, res: Response) => {
  const newJob = {
    id: jobs.length + 1,
    ...req.body
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// PUT update job (protected)
router.put('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = jobs.findIndex(j => j.id === id);
  if (index === -1) return res.status(404).json({ error: 'Job not found' });
  
  jobs[index] = { ...jobs[index], ...req.body };
  res.json(jobs[index]);
});

// DELETE job (protected)
router.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  jobs = jobs.filter(j => j.id !== id);
  res.status(204).send();
});

export default router;
