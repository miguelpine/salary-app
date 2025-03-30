// const API_URL = 'http://localhost:5001/api'; // Update with your backend URL
const API_URL = 'https://salary-app-xisb.onrender.com/api';

export const fetchSalaries = async () => {
  const response = await fetch(`${API_URL}/salaries`);
  if (!response.ok) {
    throw new Error('Error: Network response was not ok');
  }
  return response.json();
};

export const addSalary = async (salaryData: { name: string; amount: number; date: string }) => {
  const response = await fetch(`${API_URL}/salaries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(salaryData),
  });
  if (!response.ok) {
    throw new Error('Failed to add salary');
  }
  return response.json();
};
