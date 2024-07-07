import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionsTable from './components/TransactionsTable';

type Transaction = {
  amount: number;
  date: string;
  category: string;
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalDebits, setTotalDebits] = useState<number>(0);
  const [highestCategory, setHighestCategory] = useState<string>('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [transactions]);

  const fetchTransactions = async () => {
    const response = await fetch('/transactions');
    const data = await response.json();
    setTransactions(data);
  };

  const addTransaction = async (amount: number, date: string, category: string) => {
    const response = await fetch('/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, date, category }),
    });
    const newTransaction = await response.json();
    setTransactions([...transactions, newTransaction]);
  };

  const calculateStats = () => {
    let credits = 0;
    let debits = 0;
    const categories: { [key: string]: number } = {};
    let maxSpends = 0;
    let maxCategory = '';

    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        credits += transaction.amount;
      } else {
        debits += transaction.amount;
      }
      if (!categories[transaction.category]) {
        categories[transaction.category] = 0;
      }
      categories[transaction.category] += transaction.amount;
      if (categories[transaction.category] > maxSpends) {
        maxSpends = categories[transaction.category];
        maxCategory = transaction.category;
      }
    });

    setTotalCredits(credits);
    setTotalDebits(debits);
    setHighestCategory(maxCategory);
  };

  return (
    <main>
      <TransactionForm addTransaction={addTransaction} />
      <section id="stats">
        <article>
          <h2>Credits</h2>
          <p id="total-credits">{totalCredits}</p>
        </article>
        <article>
          <h2>Debits</h2>
          <p id="total-debits">{totalDebits}</p>
        </article>
        <article>
          <h2>Highest Spends Category</h2>
          <p id="highest-category">{highestCategory}</p>
        </article>
      </section>
      <h1>Transactions</h1>
      <hr />
      <TransactionsTable transactions={transactions} />
    </main>
  );
};

export default App;