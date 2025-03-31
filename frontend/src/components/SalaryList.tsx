// src/components/SalaryList.tsx

import React, { useEffect, useState } from 'react';
import { fetchSalaries, deleteSalary, updateSalary } from '../api';
import { FaTrash } from 'react-icons/fa';
import './SalaryList.css'; // Import a CSS file for additional styling

export const SalaryList: React.FC = () => {
  interface Salary {
    _id: string;
    name: string;
    amount: number;
    date: string;
  }
  
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', amount: 0, date: '' });

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

  const handleDelete = async (id: string) => {
    try {
      await deleteSalary(id);
      setSalaries((prevSalaries) => prevSalaries.filter((salary: any) => salary._id !== id));
    } catch (error) {
      console.error('Error deleting salary:', error);
    }
  };

  const handleEdit = (salary: any) => {
    setEditingId(salary._id);
    setEditData({ name: salary.name, amount: salary.amount, date: salary.date });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const updatedSalary = await updateSalary(editingId, editData);
      setSalaries((prevSalaries) =>
        prevSalaries.map((salary: any) =>
          salary._id === editingId ? updatedSalary : salary
        )
      );
      setEditingId(null);
      setEditData({ name: '', amount: 0, date: '' });
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  return (
    <div>
      <h2>Salary List</h2>
      <ul>
        {salaries.map((salary: any) => (
          <li key={salary._id}>
            {editingId === salary._id ? (
              <div>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
                  placeholder="Amount"
                />
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                />
                <button onClick={handleUpdate} style={{ marginLeft: '10px' }}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)} style={{ marginLeft: '10px' }}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {salary.name}: {salary.amount} on {new Date(salary.date).toDateString()}
                <svg
                  onClick={() => handleEdit(salary)}
                  className="icon edit-icon"
                  title="Edit"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                <FaTrash
                  onClick={() => handleDelete(salary._id)}
                  className="icon delete-icon"
                  title="Delete"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
