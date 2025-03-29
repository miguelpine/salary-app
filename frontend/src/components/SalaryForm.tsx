import React, { useState } from 'react';
import { addSalary } from '../api';

export const SalaryForm: React.FC = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSalary = await addSalary({ name, amount: parseFloat(amount), date });
      console.log('Salary added:', newSalary);
      // Reset form or update UI as needed
    } catch (error) {
      console.error('Error adding salary:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Salary</button>
    </form>
  );
};