// src/models/Salary.ts
import mongoose from 'mongoose';

const SalarySchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: Date,
});

export const Salary = mongoose.model('Salary', SalarySchema);
