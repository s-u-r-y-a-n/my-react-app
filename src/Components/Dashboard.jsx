import React, { useContext } from 'react';
import { DataContext } from '../Components/App.js'; // Assuming you are storing income and expenses in a shared context
import "../Styles/DashBoard.css";
import { Table } from 'reactstrap';


const Dashboard = () => {
    // Consume totalIncome and totalExpense from the DataContext
    const {
        totalIncome,
        totalExpense,
        expenseTransactions,
        incomeTransactions,
    } = useContext(DataContext);

    // Calculate the balance
    const balanceAmount = totalIncome - totalExpense;

    const incomeAndExpenseTransactions = [...expenseTransactions, ...incomeTransactions];
    const recentTransactions = incomeAndExpenseTransactions.slice(-5).reverse();

    return (
        <div className="dashboardPageMainParent">
            <div className="dashboardPageContainer container">
                <div className="dashboardPageRow row m-0 p-0">
                    <div className="dashboardPageColumn col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                        <div className="dashBoardDataMainBox">
                            <div className="totalIncomeBox">
                                <h6>Total Income</h6>
                                <h4>Total Income: ₹{totalIncome?.toFixed(2) || 0}</h4>
                            </div>
                            <div className="totalExpensesBox">
                                <h6>Total Expense</h6>
                                <h4>Total Expenses: ₹{totalExpense?.toFixed(2) || 0}</h4>
                            </div>
                            <div className="balanceAmountBox">
                                <h6>Balance Amount</h6>
                                <h4>Balance Amount: ₹{balanceAmount?.toFixed(2) || 0}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="dashboardPageColumn2 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="recentTransactionsHeaderParent">
                            <h3 className="recentTransactionsHeader">Recent Transactions</h3>
                        </div>

                        <div className="recentTransactionsTableParent">
                            <Table className="recentTransactionsTable"
                                bordered hover striped responsive
                            >
                                <thead className="table-warning">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Transaction</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map((info, index) => (

                                        
                                        <tr key={index}
                                        className={info.Type === "ExpesesTransaction" ? "table-danger" : "table-success"}
                                        >
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
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
