import React from 'react';

type Transaction = {
  amount: number;
  date: string;
  category: string;
};

type Props = {
  transactions: Transaction[];
};

const TransactionsTable: React.FC<Props> = ({ transactions }) => {
  let cumulative = 0;

  return (
    <table className="striped">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Category</th>
          <th scope="col">Amount</th>
          <th scope="col">Cumulative</th>
        </tr>
      </thead>
      <tbody id="transactions">
        {transactions.map((transaction, index) => {
          cumulative += transaction.amount;
          return (
            <tr key={index}>
              <th scope="row">{transaction.date}</th>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>{cumulative}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
