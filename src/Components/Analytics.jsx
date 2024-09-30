import PieChartComponent from "../Components/PieChartComponent.jsx";
import { DataContext } from '../Components/App.js';
import { useEffect, useState, useContext } from "react";
import "../Styles/Analytics.css";



const Analytics = () => {

    const {
        totalExpense,
        totalIncome,
        username,
        incomeTransactions,
        expenseTransactions,
        setIncometransactions,
        setExpensetransactions } = useContext(DataContext);

    const [expenseCategoryTotals, setExpenseCategoryTotals] = useState({});
    const [incomeCategoryTotals, setIncomeCategoryTotals] = useState({});

    useEffect(() => {
        const categoryWiseTotals = expenseTransactions.reduce((accumulator, transaction) => {
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
    }, [expenseTransactions]);


    useEffect(() => {
        const categoryWiseTotals = incomeTransactions.reduce((accumulator, transaction) => {
            const { Category, Amount } = transaction;

            if (accumulator[Category]) {
                accumulator[Category] += Amount;
            }
            else {
                accumulator[Category] = Amount;
            }
            return accumulator;
        }, {});

        setIncomeCategoryTotals(categoryWiseTotals);
    }, [incomeTransactions]);



    return (
        <div className="analyticsComponentMainParent">
            <div className="analyticsComponentMainContainer container">
                <div className="analyticsComponentRow row">
                    <div className="analyticsComponentColumn col-lg-12 col-md-12 col-sm-12 col-12">
                        <PieChartComponent
                            totalExpense={totalExpense}
                            totalIncome={totalIncome}
                            expenseCategoryTotals={expenseCategoryTotals}
                            incomeCategoryTotals={incomeCategoryTotals}
                        />
                    </div>
                </div>
            </div>

        </div>



    );
}

export default Analytics
