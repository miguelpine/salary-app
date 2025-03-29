import React from 'react';
import { SalaryForm } from './components/SalaryForm';
import { SalaryList } from './components/SalaryList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Salary Tracker</h1>
      <SalaryForm />
      <SalaryList />
    </div>
  );
};

export default App;
