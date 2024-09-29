import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import React from "react";



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = (props) => {


    // Define the data for the PieChart
    const data = [
        { name: 'Expense', value: props.data1 },
        { name: 'Income', value: props.data2 }
    ];

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ResponsiveContainer width={200} height={200} style={{ border: "3px solid black" }}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;
