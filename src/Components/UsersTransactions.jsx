import React from 'react';
import UsersExpensesTransactions from './UsersExpensesTransactions';
import UsersIncomesTransactions from './UsersIncomesTransactions';
import { useLocation } from 'react-router-dom';


const UsersTransactions = () => {

  const location = useLocation();
  const { userId } = location.state;


  return (
    <div>
      <UsersExpensesTransactions userId={userId} />
      <UsersIncomesTransactions userId={userId} />
    </div>
  )
}

export default UsersTransactions
