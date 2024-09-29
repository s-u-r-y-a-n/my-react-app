import React from "react";
import PieChartComponent from "../Components/PieChartComponent.jsx";
import { DataContext } from '../Components/App.js';
import { useContext } from "react";




const Analytics = () => {

    const { totalExpense, totalIncome, transactions, username, } = useContext(DataContext);

    console.log(transactions);
    return (
        <div>
            <h1>Welcome {username}</h1>
            <h1>{typeof transactions}</h1>

            <h3>These are the income transactions.</h3>
            <ul>
                {
                    transactions.map((transaction) => (
                        transaction.Type === "IncomeTransaction" ? ( // Use a ternary operator for conditional rendering
                            <li key={transaction.id}>
                                <strong>Category:</strong> {transaction.Category},
                                <strong>Amount:</strong> {transaction.Amount},
                                <strong>Type:</strong> {transaction.Type} {/* Corrected 'Transactions' to 'Type' */}
                            </li>
                        ) : null // Return null for other types
                    ))
                }
            </ul>

            <h3>These are the expenses transactions.</h3>
            <ul>
                {
                    transactions.map((transaction) => (
                        transaction.Type === "ExpesesTransaction" ? ( // Use a ternary operator for conditional rendering
                            <li key={transaction.id}>
                                <strong>Category:</strong> {transaction.Category},
                                <strong>Amount:</strong> {transaction.Amount},
                                <strong>Type:</strong> {transaction.Type} {/* Corrected 'Transactions' to 'Type' */}
                            </li>
                        ) : null // Return null for other types
                    ))
                }
            </ul>




            <div style={{ border: "3px solid black" }}>
                <PieChartComponent data1={totalExpense} data2={totalIncome} />
                <PieChartComponent data1={totalExpense} data2={totalIncome} />
            </div>


        </div>
    )
}

export default Analytics
