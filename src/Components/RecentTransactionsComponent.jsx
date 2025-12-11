import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';

const RecentTransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    axios.get('/api/latest-transactions')
      .then(res => {
        if (res.data.success) {
          setTransactions(res.data.transactions);
          setUserName(res.data.user_name);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (transactions.length === 0) return <p>No recent transactions.</p>;

  return (
    <div>
      <h3>{userName}'s Latest Transactions</h3>
      <ul>
        {transactions.map((tx, index) => (
          <>
          <li key={index}>
            <em>{tx.time_ago}</em> <strong>${tx.total_amount}</strong>
          </li>
          <hr />
          </>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactionsComponent;
