import React, { useState } from 'react';

type Props = {
  addTransaction: (amount: number, date: string, category: string) => void;
};

const TransactionForm: React.FC<Props> = ({ addTransaction }) => {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction(amount, date, category);
    setAmount(0);
    setDate('');
    setCategory('');
  };

  return (
    <form id="transaction-form" onSubmit={handleSubmit}>
      <input type="number" name="amount" placeholder="amount" value={amount} onChange={e => setAmount(Number(e.target.value))} required />
      <input type="date" name="date" placeholder="date" value={date} onChange={e => setDate(e.target.value)} required />
      <select name="category" value={category} onChange={e => setCategory(e.target.value)} aria-label="Select Category" required>
        <option value="" disabled>Select your category</option>
        <option>Bills and Utilities</option>
        <option>Charity</option>
        <option>Commute</option>
        <option>Education</option>
        <option>Entertainment</option>
        <option>Family and Pets</option>
        <option>Fees & Charges</option>
        <option>Fitness</option>
        <option>Food and Drinks</option>
        <option>Fuel</option>
        <option>Groceries</option>
        <option>Household</option>
        <option>Medical</option>
        <option>Personal Care</option>
        <option>Rent</option>
        <option>Shopping</option>
        <option>Travel</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;