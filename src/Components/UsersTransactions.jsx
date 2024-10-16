import React from 'react'
import UsersExpensesTransactions from './UsersExpensesTransactions'
import UsersIncomesTransactions from './UsersIncomesTransactions'

const UsersTransactions = () => {
  return (
    <div>
      <UsersExpensesTransactions />
      <UsersIncomesTransactions />
    </div>
  )
}

export default UsersTransactions
