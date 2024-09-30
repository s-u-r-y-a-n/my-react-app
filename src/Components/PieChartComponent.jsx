import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import React from "react";
import "../Styles/PieChartComponent.css";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ totalExpense, totalIncome, expenseCategoryTotals, incomeCategoryTotals }) => {


    // Define the data for the PieChart
    const data = [
        { name: 'Expense', value: totalExpense },
        { name: 'Income', value: totalIncome }
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


        <div className="pieChartComponentParent">

            <div className="pieChartComponentColumn">
                <div className="pieChartHeadingsParent">
                    <h3 className="pieChartHeadings">Income vs Expenses Breakdown</h3>
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
            </div>

            {/* Expense Category Breakdown */}
            <div className="pieChartComponentColumn">
                <div className="pieChartHeadingsParent">
                    <h3 className="pieChartHeadings">Expense Breakdown by Category</h3>
                </div>
                <div className="pieChartParent">
                    <ResponsiveContainer width="100%" height={300} >
                        <PieChart>
                            <Pie
                                data={expenseCategoryData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {expenseCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend style={{ fontWeight: "bolder" }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>


            <div className="pieChartComponentColumn">
                <div className="pieChartHeadingsParent">
                    <h3 className="pieChartHeadings">Income Breakdown by Category</h3>
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
                                {incomeCategoryData.map((entry, index) => (
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

    );
};

export default PieChartComponent;
