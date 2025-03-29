import express from 'express';
import { Salary } from '../models/Salary';

const router = express.Router();

router.post('/salaries', async (req, res) => {
  const { name, amount, date } = req.body;
  const newSalary = new Salary({ name, amount, date });
  await newSalary.save();
  res.json(newSalary);
});

router.get('/salaries', async (req, res) => {
  const salaries = await Salary.find();
  res.json(salaries);
});

export default router;
