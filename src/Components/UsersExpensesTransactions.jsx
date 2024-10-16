import { useEffect, useState } from 'react';
import axios from "axios";
import { Table, Button, FormGroup, Input, Label, Form } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../Components/App.js';
import { useContext } from 'react';
import "../Styles/UsersTransactions.css";



const UsersExpensesTransactions = () => {

  const location = useLocation();
  const { userId, Username } = location.state;
  const { adminUsername } = useContext(DataContext);

  const [userExpenseTransactions, setUserExpenseTransactions] = useState([]);
  const [expenseEntry, setExpenseEntry] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [userTotalExpense, setUserTotalExpense] = useState(0);

  useEffect(() => {
    async function fetchExpenseData() {
      try {
        const response = await axios.get(`http://localhost:3000/UserInformation`);

        // Find the user by matching the userId with the id from the response
        const user = response.data.find(user => user.id === userId);

        // Ensure that the user and their Incomes array exists
        if (user && user.Expenses) {
          setUserExpenseTransactions(user.Expenses);
        } else {
          alert("No expense transactions found for this user.");
        }
      } catch (error) {
        alert("Error fetching User's Expense Transactions");
        console.error("Error fetching User's Expense Transactions", error);
      }
    }

    fetchExpenseData();
  }, [userId]);

  async function newExpenseTransaction(e) {
    e.preventDefault();

    // Simplified match condition
    const match = userExpenseTransactions.find(
      (item) =>
        item.Transactions === expenseEntry &&
        item.Date === expenseDate &&
        item.Amount === expenseAmount &&
        item.Category === expenseCategory
    );

    if (match) {
      alert("An Entry cannot be the same in terms of all aspects");
    } else {
      try {
        // Fetch the user using the userId directly
        const userResponse = await axios.get(`http://localhost:3000/UserInformation/${userId}`);
        const user = userResponse.data;

        if (!user) {
          alert('User not found!');
          return;
        }

        // Prepare the new transaction object
        const newExpense = {
          id: Math.random().toString(36).substr(2, 5), // Random unique ID
          Transactions: expenseEntry,
          Category: expenseCategory,
          Amount: parseFloat(expenseAmount),
          Date: expenseDate,
          Type: "ExpenseTransaction"
        };

        // Update the user's Incomes array with the new transaction
        const updatedExpenses = [...user.Expenses, newExpense];

        // Send the updated user object back to the server
        await axios.put(`http://localhost:3000/UserInformation/${userId}`, {
          ...user,
          Expenses: updatedExpenses,
        });

        // Update the state in your frontend
        setUserExpenseTransactions(updatedExpenses);

        // Calculate total income
        const total = updatedExpenses.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);
        setUserTotalExpense(total);

        // Reset form fields
        setExpenseEntry('');
        setExpenseCategory('');
        setExpenseAmount('');
        setExpenseDate('');

      } catch (error) {
        alert('Error Creating A New Entry For Expense: ' + error.message);
        console.error('Error Creating A New Entry For Expense', error);
      }
    }
  }

  // Delete a transaction entry
  async function deleteEntry(expenseId) {
    try {
      const userResponse = await axios.get(`http://localhost:3000/UserInformation/${userId}`);
      const user = userResponse.data;

      // Filter out the expense to delete
      const updatedExpenses = user.Expenses.filter(expense => expense.id !== expenseId);

      // Update the user object with the filtered expenses
      await axios.put(`http://localhost:3000/UserInformation/${userId}`, {
        ...user,
        Expenses: updatedExpenses,
      });

      // Update local state
      setUserExpenseTransactions(updatedExpenses);
      const total = updatedExpenses.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);
      setUserTotalExpense(total);
    } catch (error) {
      alert('Error Deleting Entry: ' + error.message);
      console.error('Error Deleting Entry', error);
    }
  }


  return (
    <div className="userExpenseTransactionsMainParent">
      <div className="userExpenseTransactionsContainer container">
        <div className="userExpenseTransactionsRow row m-0 p-0">
          <div className="userExpenseTransactionsColumn col-lg-12 col-md-12 col-sm-12 col-12">

            <div className="usersTransactionsGreetingsContainer">
              <div>
                <h1>Hello, {adminUsername}!</h1>
              </div>
              <div>
                <h3>Welcome to Mr.{Username} Expense Transactions page.</h3>
              </div>
              <div style={{ paddingLeft: "1%", paddingRight: "1%" }}>
                <h5>
                  This section allows you to view, edit, delete, and create Expense transactions of Mr.{Username}
                  and also manipulate those data efficiently through these CRUD operations.
                </h5>
              </div>
            </div>


            <div>
              <Form className="ExpensesFormContainer mt-4 mb-4" onSubmit={newExpenseTransaction}>
                <FormGroup>
                  <Label for="transactions">
                    <b>Transaction</b>
                  </Label>
                  <Input
                    id="transactions"
                    name="Transactions"
                    placeholder="Enter Your Transaction"
                    type="text"
                    onChange={(e) => setExpenseEntry(e.target.value)}
                    value={expenseEntry}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category">
                    <b>Select the Category</b>
                  </Label>
                  <Input
                    id="category"
                    name="Category"
                    type="select"
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    value={expenseCategory}
                  >
                    <option value="none" defaultChecked>
                      Select the Category
                    </option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="amount">
                    <b>Amount</b>
                  </Label>
                  <Input
                    id="amount"
                    name="Amount"
                    placeholder="Enter The Amount"
                    type="number"
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    value={expenseAmount}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="date">
                    <b>Date</b>
                  </Label>
                  <Input
                    id="date"
                    name="Date"
                    type="date"
                    onChange={(e) => setExpenseDate(e.target.value)}
                    value={expenseDate}
                  />
                </FormGroup>
                <Button type="submit" color="success">
                  Submit
                </Button>
              </Form>
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
                    userExpenseTransactions.length > 0 ? (
                      userExpenseTransactions.map((info, index) => (
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
                              onClick={() => deleteEntry(info.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No expense transactions found</p>
                    )
                  }


                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UsersExpensesTransactions
