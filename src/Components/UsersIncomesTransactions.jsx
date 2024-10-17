import { useContext } from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Table, Button, FormGroup, Input, Label, Form } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../Components/App.js';
import "../Styles/UsersTransactions.css";
import EditAdminUserIncomeTransactions from './EditAdminUserIncomeTransactions.jsx';


const UsersIncomesTransactions = () => {

  const location = useLocation();
  const { userId, Username } = location.state;
  const { adminUsername } = useContext(DataContext);

  const [userIncomeTransactions, setUserIncomeTransactions] = useState([]);
  const [incomeEntry, setIncomeEntry] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [userTotalIncome, setUserTotalIncome] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState("");
  const [updatedUsers, setUpdatedUsers] = useState("");
  const [editUserIncomeIsOpen, setEditUserIncomeInfoIsOpen] = useState(false);
  const [previousAmount, setPreviousAmount] = useState("");



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
  }, [userId]);

  // New useEffect to calculate total expense whenever transactions change
  useEffect(() => {
    const total = userIncomeTransactions.reduce((acc, curr) => acc + parseFloat(curr.Amount || 0), 0);
    setUserTotalIncome(total);
  }, [userIncomeTransactions]);


  async function newIncomeTransaction(e) {
    e.preventDefault();

    // Simplified match condition
    const match = userIncomeTransactions.find(
      (item) =>
        item.Transactions === incomeEntry &&
        item.Date === incomeDate &&
        item.Amount === incomeAmount &&
        item.Category === incomeCategory
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
        const newIncome = {
          id: Math.random().toString(36).substr(2, 5), // Random unique ID
          Transactions: incomeEntry,
          Category: incomeCategory,
          Amount: parseFloat(incomeAmount),
          Date: incomeDate,
          Type: "IncomeTransaction"
        };

        // Update the user's Incomes array with the new transaction
        const updatedIncomes = [...user.Incomes, newIncome];

        // Send the updated user object back to the server
        await axios.put(`http://localhost:3000/UserInformation/${userId}`, {
          ...user,
          Incomes: updatedIncomes,
        });

        // Update the state in your frontend
        setUserIncomeTransactions(updatedIncomes);

        // Calculate total income
        const total = updatedIncomes.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);
        setUserTotalIncome(total);

        // Reset form fields
        setIncomeEntry('');
        setIncomeCategory('');
        setIncomeAmount('');
        setIncomeDate('');

      } catch (error) {
        alert('Error Creating A New Entry For Income: ' + error.message);
        console.error('Error Creating A New Entry For Income', error);
      }
    }
  }

  // Delete a transaction entry
  async function deleteEntry(incomeId) {
    try {
      const userResponse = await axios.get(`http://localhost:3000/UserInformation/${userId}`);
      const user = userResponse.data;

      // Filter out the expense to delete
      const updatedIncomes = user.Incomes.filter(income => income.id !== incomeId);

      // Update the user object with the filtered expenses
      await axios.put(`http://localhost:3000/UserInformation/${userId}`, {
        ...user,
        Incomes: updatedIncomes,
      });

      // Update local state
      setUserIncomeTransactions(updatedIncomes);
      const total = updatedIncomes.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);
      setUserTotalIncome(total);
    } catch (error) {
      alert('Error Deleting Entry: ' + error.message);
      console.error('Error Deleting Entry', error);
    }
  }

  // When edit button is clicked
  function handleEditClick(info) {
    setSelectedUsers(info);
    setUpdatedUsers(info);
    setPreviousAmount(parseFloat(info.Amount));
    setEditUserIncomeInfoIsOpen(!editUserIncomeIsOpen);
  }


  return (
    <div className="userIncomeTransactionsMainParent">
      <div className="userIncomeTransactionsContainer container">
        <div className="userIncomeTransactionsRow row m-0 p-0">
          <div className="userIncomeTransactionsColumn col-lg-12 col-md-12 col-sm-12 col-12">

            <div className="usersTransactionsGreetingsContainer">
              <div>
                <h1>Hello, {adminUsername}!</h1>
              </div>
              <div>
                <h3>Welcome to Mr.{Username} Income Transactions page.</h3>
              </div>
              <div style={{ paddingLeft: "1%", paddingRight: "1%" }}>
                <h5>
                  This section allows you to view, edit, delete, and create Income transactions of Mr.{Username}
                  and also manipulate those data efficiently through these CRUD operations.
                </h5>
              </div>
            </div>

            <div>
              <Form className="ExpensesFormContainer mt-4 mb-4" onSubmit={newIncomeTransaction}>
                <FormGroup>
                  <Label for="transactions">
                    <b>Transaction</b>
                  </Label>
                  <Input
                    id="transactions"
                    name="Transactions"
                    placeholder="Enter Your Transaction"
                    type="text"
                    onChange={(e) => setIncomeEntry(e.target.value)}
                    value={incomeEntry}
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
                    onChange={(e) => setIncomeCategory(e.target.value)}
                    value={incomeCategory}
                  >
                    <option value="none" defaultChecked>
                      Select the Category
                    </option>
                    <option value="Income From Salary">Income From Salary</option>
                    <option value="Freelance Work">Freelance Work</option>
                    <option value="Income From Business or Profession">Income From Business or Profession</option>
                    <option value="Income from Property">Income from Property</option>
                    <option value="Income from Investments">Income from Investments</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Income From Other Sources">Income From Other Sources</option>
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
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    value={incomeAmount}
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
                    onChange={(e) => setIncomeDate(e.target.value)}
                    value={incomeDate}
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
                              onClick={() => handleEditClick(info)}
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
                      <p>No income transactions found</p>
                    )
                  }


                </tbody>
              </Table>
              <EditAdminUserIncomeTransactions
                setEditUserIncomeInfoIsOpen={setEditUserIncomeInfoIsOpen}
                editUserIncomeIsOpen={editUserIncomeIsOpen}
                handleEditClick={handleEditClick}
                setSelectedUsers={setSelectedUsers}
                selectedUsers={selectedUsers}
                setUpdatedUsers={setUpdatedUsers}
                updatedUsers={updatedUsers}
                setUserIncomeTransactions={setUserIncomeTransactions}
                userIncomeTransactions={userIncomeTransactions}
                userId={userId}
                Username={Username}
                previousAmount={previousAmount}
                setPreviousAmount={setPreviousAmount}
                setUserTotalIncome={setUserTotalIncome}
                userTotalIncome={userTotalIncome}

              />
              <div>
                Total Income: {userTotalIncome}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



}



export default UsersIncomesTransactions;
