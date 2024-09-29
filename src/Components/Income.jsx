import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "../Styles/Income.css";
import { DataContext } from '../Components/App.js'; // Importing the DataContext to access global state

const Income = () => {
  const { totalIncome, transactions, setTotalIncome, setTransactions, username } = useContext(DataContext);
  const [entry, setEntry] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [updatedUsers, setUpdatedUsers] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [previousAmount, setPreviousAmount] = useState("");


  // Create a new transaction
  async function newTransaction(e) {
    e.preventDefault();

    const match = transactions.find((item) =>
      item.Transaction === entry &&
      item.Category === category &&
      item.Amount === amount &&
      item.Date === date
    );

    if (match) {
      alert("An Entry cannot be the same in terms of all aspects");
    } else {
      try {
        // Fetch the current user by username
        const userResponse = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
        const user = userResponse.data[0]; // Assuming the user is the first in the response

        if (!user) {
          alert('User not found!');
          return;
        }

        //Prepare the new transaction object
        const newIncome = {
          id: Math.random().toString(36).substr(2, 5), // Random unique ID
          Transaction: entry,
          Category: category,
          Amount: parseFloat(amount),
          Date: date,
          Type: "IncomeTransaction"
        };

        // Update the user's Incomes array with the new transaction
        const updatedIncomes = [...user.Incomes, newIncome];


        // Send the updated user object back to the server
        await axios.put(`http://localhost:3000/UserInformation/${user.id}`, {
          ...user,
          Incomes: updatedIncomes,
        });

        // Update the state in your frontend
        setTransactions(updatedIncomes);
        setEntry('');
        setCategory('');
        setAmount('');
        setDate('');

      } catch (error) {
        alert('Error Creating A New Entry For Incomes: ' + error.message);
        console.error('Error Creating A New Entry For Expenses', error);
      }
    }
  }


  // Fetch all transactions on component mount
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
        const user = response.data[0]; // Assuming you get an array, and you take the first (and only) user

        if (user) {
          setTransactions(user.Incomes); // Accessing and setting the Incomes
          // Calculate the total income
          const total = user.Incomes.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);
          setTotalIncome(total);
        } else {
          alert("User not found");
        }
      } catch (error) {
        alert("Error fetching incomes: " + error.message);
        console.error("Error fetching incomes:", error);
      }
    }

    fetchTransactions();
  }, [username, setTransactions, setTotalIncome]);



  // // Update total income whenever transactions change
  // useEffect(() => {
  //   const total = transactions.reduce(
  //     (acc, transaction) => acc + parseFloat(transaction.Amount),
  //     0
  //   );
  //   setTotalIncome(total);
  // }, [transactions, setTotalIncome]);



  // Delete a transaction entry
  async function deleteEntry(incomeId) {
    try {

      const userResponse = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
      const user = userResponse.data[0]; // Get the first user

      // Filter out the expense to delete
      const updatedIncomes = user.Incomes.filter(income => income.id !== incomeId);

      // Update the user object with the filtered expenses
      await axios.put(`http://localhost:3000/UserInformation/${user.id}`, {
        ...user,
        Incomes: updatedIncomes,
      });

      // Update local state
      setTransactions(updatedIncomes);
      const total = updatedIncomes.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);
      setTotalIncome(total);

    } catch (error) {
      alert("Error deleting Entry: " + error.message);
      console.error("Error deleting entry", error);
    }
  }


  //Update the user
  async function updateUser(userId, newDetails) {
    try {
      const userResponse = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
      const user = userResponse.data[0]; // Get the first user

      const updatedIncomes = user.Incomes.map(income =>
        income.id === userId ? { ...income, ...newDetails } : income
      );

      await axios.put(`http://localhost:3000/UserInformation/${user.id}`, {
        ...user,
        Incomes: updatedIncomes,
      });

      setTransactions(updatedIncomes);
    } catch (error) {
      alert('Error Updating Entry: ' + error.message);
      console.error('Error updating user:', error);
    }
  }



  // Handle input change for updating
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUpdatedUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // When edit button is clicked
  function handleEditClick(info) {
    setSelectedUsers(info);
    setUpdatedUsers(info);
    setIsEditing(true);
    setPreviousAmount(parseFloat(info.Amount));
  }

  // Handle form submission for update
  function handleUpdateSubmit(e) {
    e.preventDefault();
    if (selectedUsers) {
      const newAmount = parseFloat(updatedUsers.Amount);
      const difference = newAmount - previousAmount;
      setTotalIncome((prevTotal) => prevTotal + difference);
      updateUser(selectedUsers.id, updatedUsers);
      setIsEditing(false);
    }
  }

  return (
    <>
      <div className="incomePageMainParent">
        <div className="incomePageContainer container mt-3">
          <div className="incomePageRow row m-0 p-0">
            <div className="incomePageColumn col-lg-12 col-md-12 col-sm-12 col-12">
              <h1>{username}</h1>

              {/* Form to create a new income transaction */}
              <Form className="IncomeFormContainer mt-4 mb-4" onSubmit={newTransaction}>
                <FormGroup>
                  <Label for="transaction"><b>Transaction</b></Label>
                  <Input
                    id="transaction"
                    name="Transaction"
                    placeholder="Enter Your Transaction"
                    type="text"
                    onChange={(e) => setEntry(e.target.value)}
                    required
                    value={entry}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category"><b>Select the Category</b></Label>
                  <Input
                    id="category"
                    name="Category"
                    type="select"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    value={category}
                  >
                    <option value="none">Select the Category</option>
                    <option value="Income From Salary">Income From Salary</option>
                    <option value="Freelance Work">Freelance Work</option>
                    <option value="Income From Business or Profession">Income From Business or Profession</option>
                    <option value="Income from Property">Income from Property</option>
                    <option value="Income from Investments">Income from Investments</option>
                    <option value="Income From Other Sources">Income From Other Sources</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="amount"><b>Amount</b></Label>
                  <Input
                    id="amount"
                    name="Amount"
                    type="number"
                    placeholder="Enter The Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    value={amount}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="date"><b>Date</b></Label>
                  <Input
                    id="date"
                    name="Date"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    required
                    value={date}
                  />
                </FormGroup>
                <Button type="submit" color="success">Submit</Button>
              </Form>

              {transactions.length > 0 && (
                <>
                  {/* Table to display the list of income transactions */}
                  <Table bordered responsive striped hover className="incomeTableContainer rounded-4">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Transaction</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((info, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{info.Transaction}</td>
                          <td>{info.Category}</td>
                          <td>{info.Amount}</td>
                          <td>{info.Date}</td>
                          <td>
                            <Button color="success" onClick={() => handleEditClick(info)}>Edit</Button>
                          </td>
                          <td>
                            <Button color="danger" onClick={() => deleteEntry(info.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* Display total income */}
                  <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                    <div className="totalIncomeParent">
                      <h3 style={{ margin: "0px" }}>Total Income: {totalIncome}</h3>
                    </div>
                  </div>
                </>
              )}

              {isEditing && (
                <Form className="IncomeFormContainer mt-4" onSubmit={handleUpdateSubmit}>
                  <FormGroup>
                    <Label for="transaction"><b>Transaction</b></Label>
                    <Input
                      id="transaction"
                      name="Transaction"
                      type="text"
                      onChange={handleInputChange}
                      value={updatedUsers.Transaction || ""}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="category"><b>Select the Category</b></Label>
                    <Input
                      id="category"
                      name="Category"
                      type="select"
                      onChange={handleInputChange}
                      value={updatedUsers.Category || ""}
                      required
                    >
                      <option value="none">Select the Category</option>
                      <option value="Income From Salary">Income From Salary</option>
                      <option value="Freelance Work">Freelance Work</option>
                      <option value="Income From Business or Profession">Income From Business or Profession</option>
                      <option value="Income from Property">Income from Property</option>
                      <option value="Income from Investments">Income from Investments</option>
                      <option value="Income From Other Sources">Income From Other Sources</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount"><b>Amount</b></Label>
                    <Input
                      id="amount"
                      name="Amount"
                      type="number"
                      onChange={handleInputChange}
                      value={updatedUsers.Amount || ""}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="date"><b>Date</b></Label>
                    <Input
                      id="date"
                      name="Date"
                      type="date"
                      onChange={handleInputChange}
                      value={updatedUsers.Date || ""}
                      required
                    />
                  </FormGroup>
                  <Button type="submit" color="primary">Update</Button>
                </Form>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Income;
