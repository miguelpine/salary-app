// src/components/SalaryList.tsx

import React, { useEffect, useState } from 'react';
import { fetchSalaries } from '../api';

export const SalaryList: React.FC = () => {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    const getSalaries = async () => {
      try {
        const data = await fetchSalaries();
        setSalaries(data);
      } catch (error) {
        console.error('Error fetching salaries:', error);
      }
    };

    getSalaries();
  }, []);

  return (
    <div>
      <h2>Salary List</h2>
      <ul>
        {salaries.map((salary: any) => (
          <li key={salary._id}>
            {salary.name}: {salary.amount} on {new Date(salary.date).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
