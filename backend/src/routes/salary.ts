import express, { Request, Response } from 'express';
import { Salary } from '../models/Salary';

const router = express.Router();

router.post('/salaries', async (req: Request, res: Response) => {
  const { name, amount, date } = req.body;
  const newSalary = new Salary({ name, amount, date });
  await newSalary.save();
  res.json(newSalary);
});

router.get('/salaries', async (_req: Request, res: Response) => {
  const salaries = await Salary.find();
  res.json(salaries);
});

router.delete('/salaries/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const deletedSalary = await Salary.findByIdAndDelete(id);
    if (!deletedSalary) {
      res.status(404).json({ message: 'Salary not found' });
    }
    res.json({ message: 'Salary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting salary', error });
  }
});

router.put('/salaries/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { name, amount, date } = req.body;
  try {
    const updatedSalary = await Salary.findByIdAndUpdate(
      id,
      { name, amount, date },
      { new: true }
    );
    if (!updatedSalary) {
      res.status(404).json({ message: 'Salary not found' });
    }
    res.json(updatedSalary);
  } catch (error) {
    res.status(500).json({ message: 'Error updating salary', error });
  }
});

export default router;
