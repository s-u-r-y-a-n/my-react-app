import { Offcanvas, OffcanvasHeader, OffcanvasBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../Styles/EditAdminUserIncomeTransactions.css";

const EditAdminUserIncomeTransactions = ({
    setEditUserIncomeInfoIsOpen,
    editUserIncomeIsOpen,
    handleEditClick,
    setSelectedUsers,
    selectedUsers,
    setUpdatedUsers,
    updatedUsers,
    setUserIncomeTransactions,
    userIncomeTransactions,
    userId,
    Username,
    previousAmount,
    setPreviousAmount,
    userTotalIncome,
    setUserTotalIncome
}) => {

    // Set selected user and amount on component mount
    useEffect(() => {
        if (selectedUsers) {
            setUpdatedUsers(selectedUsers); // Populate form with selected user's details
            setPreviousAmount(parseFloat(selectedUsers.Amount || 0)); // Set previous amount
        }
    }, [selectedUsers]);

    // Update the user
    async function updateUser(incomeId, newDetails) {
        try {
            const userResponse = await axios.get(`http://localhost:3000/UserInformation/${userId}`);
            const user = userResponse.data;

            // Find the specific expense to update
            const updatedIncomes = user.Incomes.map(income =>
                income.id === incomeId ? { ...income, ...newDetails } : income
            );

            // Update the user's expense transactions
            await axios.put(`http://localhost:3000/UserInformation/${user.id}`, {
                ...user,
                Incomes: updatedIncomes,
            });

            setUserIncomeTransactions(updatedIncomes);
        } catch (error) {
            alert('Error Updating Entry: ' + error.message);
            console.error('Error updating user:', error);
        }
    }

    // Handle input change for updating
    function handleInputChange(e) {
        const { name, value } = e.target;
        setUpdatedUsers(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    // Handle form submission for update
    function handleUpdateSubmit(e) {
        e.preventDefault();
        if (selectedUsers) {
            const newAmount = parseFloat(updatedUsers.Amount);
            const difference = newAmount - previousAmount;
            setUserTotalIncome(prevTotal => prevTotal + difference);
            // Log updatedUsers for debugging
            console.log('Updated Users:', updatedUsers);
            // Pass the correct user ID and updated details
            updateUser(selectedUsers.id, updatedUsers);
        }
    }

    return (

        <Offcanvas toggle={handleEditClick}
            isOpen={editUserIncomeIsOpen}
            direction="end"
            className="editAdminUserIncomeOffcanvas p-0">

            <OffcanvasHeader toggle={handleEditClick}
                className="editAdminUserIncomeOffcanvasHeader m-0"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3.5%",
                    paddingLeft: "18%",
                    height: "15%"
                }}
            >
                <h4 style={{ textAlign: "center", color: "white" }}>Edit User Income Data</h4>
            </OffcanvasHeader>
            <OffcanvasBody className="editAdminUserIncomeOffcanvasBody m-0 p-0"
                style={{ width: "100%", height: "100%" }}
            >
                <Form className="editAdminIncomeFormContainer m-0 p-3 class"
                    onSubmit={handleUpdateSubmit}
                    style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
                >
                    <FormGroup >
                        <Label for="transaction"><b>Transaction</b></Label>
                        <Input
                            id="transaction"
                            name="Transactions"
                            type="text"
                            onChange={handleInputChange}
                            value={updatedUsers.Transactions || ""}
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
                    <Button type="submit" color="success" className="mt-3"
                    ><strong>Update</strong></Button>
                </Form>
            </OffcanvasBody>
        </Offcanvas>

    );
}

export default EditAdminUserIncomeTransactions;
