import { useLocation } from 'react-router-dom';
import { DataContext } from './App';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import "../Styles/PieChartComponent.css";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const AdminUserAnalyticsPage = () => {

    const location = useLocation();
    const { adminUsername } = useContext(DataContext);
    const { userId, Username } = location.state;
    const [clientIncomeTransactions, setClientIncomeTransactions] = useState([]);
    const [clientExpenseTransactions, setClientExpenseTransactions] = useState([]);
    const [clientTotalExpense, setClientTotalExpense] = useState(0);
    const [clientTotalIncome, setClientTotalIncome] = useState(0);
    const [expenseCategoryTotals, setExpenseCategoryTotals] = useState({});
    const [incomeCategoryTotals, setIncomeCategoryTotals] = useState({});


    useEffect(
        function callBack() {
            async function fetchUserData() {
                try {
                    const response = await axios.get(`http://localhost:3000/UserInformation`);

                    // Find the user by matching the userId with the id from the response
                    const user = response.data.find(user => user.id === userId);
                    // Ensure that the user and their Incomes array exists
                    if (user && user.Incomes && user.Expenses) {
                        setClientIncomeTransactions(user.Incomes);
                        setClientExpenseTransactions(user.Expenses);
                        // Calculate the total income and total expense
                        const totalIncome = user.Incomes.reduce((sum, transaction) => sum + transaction.Amount, 0);
                        const totalExpense = user.Expenses.reduce((sum, transaction) => sum + transaction.Amount, 0);
                        setClientTotalIncome(totalIncome);
                        setClientTotalExpense(totalExpense);
                    } else {
                        alert("No Income as well as Expense transactions found for this user.");
                    }
                } catch (error) {
                    alert('Error Updating Entry: ' + error.message);
                }
            }
            fetchUserData();
        }, [userId]);

    useEffect(() => {
        const categoryWiseTotals = clientExpenseTransactions.reduce((accumulator, transaction) => {
            const { Category, Amount } = transaction;

            if (accumulator[Category]) {
                accumulator[Category] += Amount;
            }
            else {
                accumulator[Category] = Amount;
            }
            return accumulator;
        }, {});

        setExpenseCategoryTotals(categoryWiseTotals);
    }, [clientExpenseTransactions]);

    useEffect(() => {
        const categoryWiseIncomes = clientIncomeTransactions.reduce((accumulator, transaction) => {
            const { Category, Amount } = transaction;

            if (accumulator[Category]) {
                accumulator[Category] += Amount;
            }
            else {
                accumulator[Category] = Amount;
            }
            return accumulator;
        }, {});

        setIncomeCategoryTotals(categoryWiseIncomes);
    }, [clientIncomeTransactions]);


    // Define the data for the PieChart
    const data = [
        { name: 'Expense', value: clientTotalExpense },
        { name: 'Income', value: clientTotalIncome }
    ];

    // Prepare data for category-wise expenses
    const expenseCategoryData = Object.keys(expenseCategoryTotals).map(category => ({
        name: category,
        value: expenseCategoryTotals[category]
    }));

    // Prepare data for category-wise income
    const incomeCategoryData = Object.keys(incomeCategoryTotals).map(category => ({
        name: category,
        value: incomeCategoryTotals[category]
    }));

    return (
        <div className="adminUserAnalyticsPageMainParent">
            <div className="adminUserAnalyticsPageContainer container">
                <div className="adminUserAnalyticsPageRow row m-0 p-0">
                    <div className="adminUserAnalyticsPageColumn col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="adminUserAnalyticsPageGreetingsContainer">
                            <div>
                                <h1>Hello, {adminUsername}!</h1>
                            </div>
                            <div>
                                <h3>Welcome to Mr.{Username}'s Analytics Page.</h3>
                            </div>
                            <div>
                                <h5>
                                    On this page, you can view and analyze {Username}'s financial data, including their expenses,
                                    incomes, and transaction trends. Use the data to gain insights into their financial activities
                                    and help manage their account effectively.
                                </h5>
                            </div>
                        </div>

                        <div className="pieChartParent">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="pieChartParent">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={expenseCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="pieChartParent">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={incomeCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUserAnalyticsPage
