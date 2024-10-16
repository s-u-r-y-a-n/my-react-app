import { DataContext } from '../Components/App.js';
import { useContext, useEffect, useState } from 'react';
import "../Styles/AdminDashBoard.css";
import axios from 'axios';
import AdminDashBoardPieChart from './AdminDashBoardPieChart.jsx';

const AdminDashBoard = () => {
    const {
        adminUsername,
        setAdminUsername,
        adminEmail,
        setAdminEmail,
        adminPassword,
        setAdminPassword,
        totalUsers,
        incomeEntries,
        expenseEntries,
        totalUsersIncome,
        totalUsersExpense,
        totalExpenseCategoryWise,
        totalIncomeCategoryWise,
        setTotalUsers,
        setIncomeEntries,
        setExpenseEntries,
        setTotalUsersIncome,
        setTotalUsersExpense,
        setTotalIncomeCategoryWise,
        setTotalExpenseCategoryWise
    } = useContext(DataContext);


    useEffect(
        function callBack() {
            async function fetchUsers() {
                try {
                    const response = await axios.get("http://localhost:3000/UserInformation");
                    const incomes = response.data.flatMap((users) => users.Incomes);
                    const expenses = response.data.flatMap((users) => users.Expenses);
                    const categoryWiseExpense = expenses.reduce((accumulator, transaction) => {
                        const { Category, Amount } = transaction; // Destructure the Category and Amount

                        // Add Amount to the corresponding category in the accumulator
                        if (accumulator[Category]) {
                            accumulator[Category] += parseFloat(Amount); // Ensure Amount is treated as a number
                        } else {
                            accumulator[Category] = parseFloat(Amount);
                        }
                        return accumulator;
                    }, {});


                    const categoryWiseIncome = incomes.reduce((accumulator, transaction) => {
                        const { Category, Amount } = transaction;

                        if (accumulator[Category]) {
                            accumulator[Category] += parseFloat(Amount);
                        } else {
                            accumulator[Category] = parseFloat(Amount);
                        }
                        return accumulator;
                    }, {});

                    setIncomeEntries(incomes.length);
                    setExpenseEntries(expenses.length)
                    setTotalUsers(response.data.length);
                    setTotalUsersIncome(incomes.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0));
                    setTotalUsersExpense(expenses.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0));
                    setTotalExpenseCategoryWise(categoryWiseExpense);
                    setTotalIncomeCategoryWise(categoryWiseIncome);

                } catch (error) {
                    alert("Error from fetching User's data in the AdminDashBoard component");
                }
            }
            fetchUsers();

            // const interval = setInterval(fetchUsers, 1000);

            // return () => clearInterval(interval);

        }, [totalUsersIncome, totalUsersExpense]);






    return (
        <div className="adminDashBoardMainPage">
            <div className="adminDashBoardContainer container">
                <div className="adminDashBoardRow row m-0 p-0">
                    <div className="adminDashBoardColumn col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="adminDashBoardHeaderContainer">
                            <h1>Hello, Mr. {adminUsername} </h1>
                            <h3>Welcome to the Expensewise Admin Dashboard.</h3>
                            <h5>As an admin, you have complete oversight of the platform's users and their financial activities.</h5>
                            <h5>Here, you can monitor user accounts, track income and expenses and review transactions,</h5>
                        </div>

                        <div className="usersCountContainer">
                            <h1 className="usersCount">Total Users: {totalUsers}</h1>
                            <h1>Total No. of entries: {incomeEntries + expenseEntries}</h1>
                            <h1>Income Entries: {incomeEntries}</h1>
                            <h1>Expense Entries: {expenseEntries}</h1>
                            <h1>Total Income: {totalUsersIncome}</h1>
                            <h1>Total Expense: {totalUsersExpense}</h1>
                            <h1>Food: {totalExpenseCategoryWise.Food}</h1>
                            <h1>Income From Salary: {totalIncomeCategoryWise[`Income From Salary`]}</h1>
                        </div>

                        <AdminDashBoardPieChart />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminDashBoard
