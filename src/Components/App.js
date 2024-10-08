import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import Register from "./Register";
import StartingPage from './StartingPage';
import AdminLogin from './AdminLogin';
import Login from "../Components/Login";
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import Dashboard from './Dashboard';
import Income from './Income';
import Expenses from './Expenses';
import Analytics from './Analytics';
import HomePage from './HomePage';
import Register2 from './Register2';
export const DataContext = createContext();

function App() {
  const [adminData, setAdminData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [incomeTransactions, setIncometransactions] = useState([]);
  const [expenseTransactions, setExpensetransactions] = useState([]);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")).username : "");
  const [email, setEmail] = useState(localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")).email : "");
  const [password, setPassword] = useState(localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")).password : "");



  // Fetch initial data

  useEffect(() => {
    async function fetchData() {
      try {
        const adminData = await axios.get('http://localhost:4000/AdminInformation');
        const response = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
        const incomeData = await axios.get('http://localhost:4500/Income');
        const expenseData = await axios.get('http://localhost:3100/Expenses');

        setAdminData(adminData.data);
        setUserData(response.data[0]);
        setTotalIncome(incomeData.data.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0));
        setTotalExpense(expenseData.data.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0));
        setIncometransactions([...incomeData.data]);
        setExpensetransactions([...expenseData.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  const consolidatedData = {
    adminData,
    userData,
    totalIncome,
    totalExpense,
    username,
    expenseTransactions,
    incomeTransactions,
    email,
    password,
    setExpensetransactions,
    setIncometransactions,
    setUsername,
    setTotalIncome,
    setTotalExpense,
    setPassword,
    setEmail
  };

  return (
    <DataContext.Provider value={consolidatedData}>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/StartingPage" element={<StartingPage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/Register" element={<Register />} /> */}
        <Route path="/Register2" element={<Register2 />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Income" element={<Income />} />
        <Route path="/Expenses" element={<Expenses />} />
        <Route path="/Analytics" element={<Analytics />} />
      </Routes>
    </DataContext.Provider>
  );
}

export default App;