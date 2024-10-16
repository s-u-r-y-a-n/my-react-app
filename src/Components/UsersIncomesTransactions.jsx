import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Table, Button } from 'reactstrap';

const UsersIncomesTransactions = ({ userId }) => {
  const [userIncomeTransactions, setUserIncomeTransactions] = useState([]);

  useEffect(() => {
    async function fetchIncomeData() {
      try {
        const response = await axios.get(`http://localhost:3000/UserInformation`);

        // Find the user by matching the userId with the id from the response
        const user = response.data.find(user => user.id === userId);

        // Ensure that the user and their Incomes array exists
        if (user && user.Incomes) {
          setUserIncomeTransactions(user.Incomes);
        } else {
          alert("No income transactions found for this user.");
        }
      } catch (error) {
        alert("Error fetching User's Income Transactions");
        console.error("Error fetching User's Income Transactions", error);
      }
    }

    fetchIncomeData();
  }, [userId]);  // Add userId as a dependency

  return (
    <div className="userIncomeTransactionsMainParent">
      <div className="userIncomeTransactionsContainer container">
        <div className="userIncomeTransactionsRow row m-0 p-0">
          <div className="userIncomeTransactionsColumn col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="userIncomeTransactionsGreetingsContainer">
              <h1>Hello Admin Welcome to User's Income Transactions</h1>
            </div>
            <div>
              <Table
                bordered hover striped responsive
              >
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Transactions</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userIncomeTransactions.length > 0 ? (
                      userIncomeTransactions.map((info, index) => (
                        <tr key={index}>
                          <th scope="row">
                            {index + 1}
                          </th>
                          <td>
                            {info.Transactions}
                          </td>
                          <td>
                            {info.Category}
                          </td>
                          <td>
                            {info.Amount}
                          </td>
                          <td>
                            {info.Date}
                          </td>
                          <td>
                            <Button
                              color="success"
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              color="danger"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No income transactions found</p>
                    )
                  }


                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



}



export default UsersIncomesTransactions;
