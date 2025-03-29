import React from 'react';
import { SalaryForm } from './components/SalaryForm';
import { SalaryList } from './components/SalaryList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Salary Tracker</h1>
      <div className="card">
        <SalaryForm />
      </div>
      <div className="card">
        <SalaryList />
      </div>
    </div>
  );
};

export default App;
