import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Register";
import StartingPage from './StartingPage';
import AdminLogin from './AdminLogin';
import Login from "../Components/Login";
import { Routes, Route } from "react-router-dom";
import AdminPage from './AdminPage';
import UserPage from './UserPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/StartingPage" element={<StartingPage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/UserPage" element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App;