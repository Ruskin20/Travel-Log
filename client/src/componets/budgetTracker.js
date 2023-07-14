import React, { useState } from 'react';
import './budgetTracker.css';

function BudgetTracker() {
    const [budget, setBudget] = useState(0);
    const [expense, setExpense] = useState('');
    const [amount, setAmount] = useState(0);
    const [expenses, setExpenses] = useState([]);
  
    const handleBudgetChange = (element) => {
      setBudget(parseFloat(element.target.value));
    };
  
    const handleExpenseChange = (element) => {
      setExpense(element.target.value);
    };
  
    const handleAmountChange = (element) => {
      setAmount(parseFloat(element.target.value));
    };
  
    const handleClear = () => {
      setBudget(0);
      setExpenses([]);
    };
  
    const addExpense = (element) => {
      element.preventDefault();
  
      const newExpense = {
        expense: expense,
        amount: amount
      };
  
      setExpenses([...expenses, newExpense]);
  
      setBudget(budget - amount);
  
      setExpense('');
      setAmount(0);
    };

  return (
    <div>
      <form>
      <h2>Trip Spending</h2>
        <label className='budget'>
          Set Budget:
          <input type="number" value={budget} onChange={handleBudgetChange} />
        </label>
      </form>

      <form onSubmit={addExpense}>
        <label className='expense'>
          Expense:
          <input type="text" value={expense} onChange={handleExpenseChange} />
        </label>
        <label className='amount'>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
        <div className='buttons'>
            <button type="submit">Add Expense</button>
            <button onClick={handleClear}>Clear All</button>
        </div>
      </form>

      <h2>Budget: {budget.toFixed(2)}</h2>
      <div className="expense-list-container">
        <ul className="expense-list">
            {expenses.map((expense, index) => (
            <li key={index}>
                {expense.expense}: ${expense.amount.toFixed(2)}
            </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default BudgetTracker;