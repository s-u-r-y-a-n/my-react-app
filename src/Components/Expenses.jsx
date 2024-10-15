

import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { DataContext } from '../Components/App.js';
import '../Styles/Expenses.css';
import ExpensesFilterOptions from './ExpensesFilterOptions.jsx';

const Expenses = () => {
    const { totalExpense, setTotalExpense, expenseTransactions, setExpensetransactions, username } = useContext(DataContext);
    const [entry, setEntry] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [updatedUsers, setUpdatedUsers] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [previousAmount, setPreviousAmount] = useState(0);
    const [userData, setUserdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState([]); // Filtered transactions
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [originalTransactions, setoriginalTransactions] = useState();




    useEffect(() => {
        async function fetchData() {
            if (!username) return; // Check for username inside the hook
            try {
                // Fetch user data based on the username
                const response = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
                setUserdata(response.data[0]); // Assuming the first result is the correct user
                console.log("User Data Fetched:", response.data[0]);
            } catch (error) {
                alert("Error fetching data in Personal Info Offcanvas component");
                console.error(error);
            }
        }
        fetchData(); // Call the function to fetch data
    }, [username]); // Add username as a dependency, so it refetches if the username changes


    async function newTransaction(e) {
        e.preventDefault();

        const match = expenseTransactions.find(
            (item) =>
                item.Transactions === entry &&
                item.Category === category &&
                item.Amount === amount &&
                item.Date === date
        );

        if (match) {
            alert('An Entry cannot be the same in all aspects');
        } else {
            try {
                // Fetch the current user by username
                const userResponse = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
                const user = userResponse.data[0]; // Assuming the user is the first in the response

                if (!user) {
                    alert('User not found!');
                    return;
                }

                // Prepare the new transaction object
                const newExpense = {
                    id: Math.random().toString(36).substr(2, 5), // Random unique ID
                    Transactions: entry,
                    Category: category,
                    Amount: parseFloat(amount),
                    Date: date,
                    Type: "ExpesesTransaction"
                };

                // Update the user's Expenses array with the new transaction
                const updatedExpenses = [...user.Expenses, newExpense];

                // Send the updated user object back to the server
                await axios.put(`http://localhost:3000/UserInformation/${user.id}`, {
                    ...user,
                    Expenses: updatedExpenses,

                });

                // Update the state in your frontend
                setExpensetransactions(updatedExpenses);
                setEntry('');
                setCategory('');
                setAmount('');
                setDate('');
            } catch (error) {
                alert('Error Creating A New Entry For Expenses: ' + error.message);
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
                    setExpensetransactions(user.Expenses); // Accessing and setting the Expenses
                    setoriginalTransactions(user.Expenses);
                    // Calculate the total expense
                    const total = user.Expenses.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);
                    setTotalExpense(total);
                } else {
                    alert("User not found");
                }
            } catch (error) {
                alert("Error fetching expenses: " + error.message);
                console.error("Error fetching expenses:", error);
            }
        }

        fetchTransactions();
    }, [username, setExpensetransactions, setTotalExpense]);

    // Update total expense whenever transactions change
    useEffect(() => {
        const total = expenseTransactions.reduce(
            (acc, transaction) => acc + parseFloat(transaction.Amount),
            0
        );
        setTotalExpense(total);
    }, [expenseTransactions, setTotalExpense]);


    // Delete a transaction entry
    async function deleteEntry(expenseId) {
        try {
            const userResponse = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
            const user = userResponse.data[0]; // Get the first user

            // Filter out the expense to delete
            const updatedExpenses = user.Expenses.filter(expense => expense.id !== expenseId);

            // Update the user object with the filtered expenses
            await axios.put(`http://localhost:3000/UserInformation/${user.id}`, {
                ...user,
                Expenses: updatedExpenses,
            });

            // Update local state
            setExpensetransactions(updatedExpenses);
            const total = updatedExpenses.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);
            setTotalExpense(total);
        } catch (error) {
            alert('Error Deleting Entry: ' + error.message);
            console.error('Error Deleting Entry', error);
        }
    }


    async function updateUser(userId, newDetails) {
        try {
            const userResponse = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
            const user = userResponse.data[0]; // Get the first user

            const updatedExpenses = user.Expenses.map(expense =>
                expense.id === userId ? { ...expense, ...newDetails } : expense
            );

            await axios.put(`http://localhost:3000/UserInformation/${user.id}`, {
                ...user,
                Expenses: updatedExpenses,
            });

            setExpensetransactions(updatedExpenses);
        } catch (error) {
            alert('Error Updating Entry: ' + error.message);
            console.error('Error updating user:', error);
        }
    }


    function handleEditClick(info) {
        setIsEditing(true);
        setSelectedUsers(info);
        setUpdatedUsers(info);
        setPreviousAmount(parseFloat(info.Amount));
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUpdatedUsers((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleUpdateSubmit(e) {
        e.preventDefault();
        if (selectedUsers) {
            const newAmount = parseFloat(updatedUsers.Amount);
            const difference = newAmount - previousAmount;
            setTotalExpense((prevTotal) => prevTotal + difference);
            updateUser(selectedUsers.id, updatedUsers);
            setIsEditing(false);
        }
    }




    return (
        <>
            <div className="ExpensesPageMainParent">
                <div className="ExpensesPageContainer container mt-3">
                    <div className="ExpensesPageRow row m-0 p-0">
                        <div className="ExpensesPageColumn col-lg-12 col-md-12 col-sm-12 col-12">
                            <div>
                                <h2>Welcome, {`${userData.FirstName} ${userData.LastName}`} </h2>
                            </div>

                            <div>
                                <p>
                                    Welcome to the expense management section. Monitoring your expenses closely helps you maintain control over your budget and achieve financial stability.
                                </p>
                            </div>

                            <Form onSubmit={newTransaction} className="ExpensesFormContainer mt-4 mb-4">
                                <FormGroup>
                                    <Label for="transactions">
                                        <b>Transaction</b>
                                    </Label>
                                    <Input
                                        id="transactions"
                                        name="Transactions"
                                        placeholder="Enter Your Transaction"
                                        type="text"
                                        onChange={(e) => setEntry(e.target.value)}
                                        value={entry}
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
                                        onChange={(e) => setCategory(e.target.value)}
                                        value={category}
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
                                        onChange={(e) => setAmount(e.target.value)}
                                        value={amount}
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
                                        onChange={(e) => setDate(e.target.value)}
                                        value={date}
                                    />
                                </FormGroup>
                                <Button type="submit" color="success">
                                    Submit
                                </Button>
                            </Form>


                            <ExpensesFilterOptions
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                startDate={startDate}
                                setstartDate={setstartDate}
                                endDate={endDate}
                                setendDate={setendDate}
                                expenseTransactions={expenseTransactions}
                                setFilteredTransactions={setFilteredTransactions}
                                filteredTransactions={filteredTransactions}
                                setoriginalTransactions={setoriginalTransactions}
                                originalTransactions={originalTransactions}
                            />



                            {filteredTransactions.length > 0 && (
                                <>
                                    <Table bordered hover striped responsive className="customExpensesTable" >
                                        <thead className="expensesTableHead">
                                            <tr className="table-danger">
                                                <th>S.No</th>
                                                <th>Transaction</th>
                                                <th>Category</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {filteredTransactions.map((info, index) => (
                                                <tr key={info.id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{info.Transactions}</td>
                                                    <td>{info.Category}</td>
                                                    <td>{info.Amount}</td>
                                                    <td>{info.Date}</td>
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
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div className="totalExpenseParent">
                                            <h3 style={{ margin: '0px' }}>
                                                Total Expense: {totalExpense.toFixed(2)}
                                            </h3>
                                        </div>
                                    </div>
                                </>
                            )}

                            {isEditing && (
                                <Form
                                    onSubmit={handleUpdateSubmit}
                                    className="ExpensesFormContainer mt-3"
                                >
                                    <h3>Please Edit Your Changes</h3>
                                    <FormGroup>
                                        <Label for="transactions">
                                            <b>Transaction</b>
                                        </Label>
                                        <Input
                                            id="transactions"
                                            name="Transactions"
                                            type="text"
                                            onChange={handleInputChange}
                                            value={updatedUsers.Transactions || ''}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="category">
                                            <b>Category</b>
                                        </Label>
                                        <Input
                                            id="category"
                                            name="Category"
                                            type="select"
                                            onChange={handleInputChange}
                                            value={updatedUsers.Category || ''}
                                        >
                                            <option>Food</option>
                                            <option>Transportation</option>
                                            <option>Health</option>
                                            <option>Entertainment</option>
                                            <option>Clothing</option>
                                            <option>Personal Care</option>
                                            <option>Miscellaneous</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="amount">
                                            <b>Amount</b>
                                        </Label>
                                        <Input
                                            id="amount"
                                            name="Amount"
                                            type="number"
                                            onChange={handleInputChange}
                                            value={updatedUsers.Amount || ''}
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
                                            onChange={handleInputChange}
                                            value={updatedUsers.Date || ''}
                                        />
                                    </FormGroup>
                                    <Button type="submit" color="success">
                                        Update
                                    </Button>
                                </Form>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Expenses;
