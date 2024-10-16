import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";



const UsersIncomesTransactions = () => {

  const { userId } = useParams();

  const [userIncomeTransactions, setUserIncomeTransactions] = useState([]);

  useEffect(
    function callBack() {
      async function fetchExpenseData() {
        try {
          const response = await axios.get(`http://localhost:3000/UserInformation?userId=${userId}`);
          setUserIncomeTransactions(response.data.Incomes);
          console.log(userIncomeTransactions);
        } catch (error) {
          alert("Error from fetching User's Income Transactions")
        }
      }
      fetchExpenseData();
    }, []);

  return (
    <div className="userIncomeTransactionsMainParent">
      <div className="userIncomeTransactionsContainer container">
        <div className="userIncomeTransactionsRow row m-0 p-0">
          <div className="userIncomeTransactionsColumn col-lg-12 col-md-12 col-sm-12 col-12">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersIncomesTransactions
