



import React, { useContext } from 'react';
import { DataContext } from '../Components/App.js'; // Assuming you are storing income and expenses in a shared context
import "../Styles/DashBoard.css";

const Dashboard = () => {
    // Consume totalIncome and totalExpense from the DataContext
    const { totalIncome, totalExpense } = useContext(DataContext);

    // Calculate the balance
    const balanceAmount = totalIncome - totalExpense;

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
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
