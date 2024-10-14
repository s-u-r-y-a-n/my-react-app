import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { DataContext } from '../Components/App.js';
import axios from 'axios';
import "../Styles/adminPage.css";
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {

    const {
        adminUsername,
        setAdminUsername,
        adminEmail,
        setAdminEmail,
        adminPassword,
        setAdminPassword,
    } = useContext(DataContext);

    const navigate = useNavigate();

    const [userData, setUserdata] = useState(null); // Changed initial state to `null`
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        async function fetchData() {
            const savedAdmin = JSON.parse(localStorage.getItem("loggedAdminInfo"));

            if (!savedAdmin) return; // If no saved admin data, do nothing

            setAdminUsername(savedAdmin.username);
            setAdminEmail(savedAdmin.email);
            setAdminPassword(savedAdmin.password);

            try {
                // Fetch admin data based on the username
                const response = await axios.get(`http://localhost:4000/AdminInformation?Username=${savedAdmin.username}`);
                setUserdata(response.data[0]); // Assuming the first result is the correct admin
                console.log("Admin Data Fetched:", response.data[0]);
            } catch (error) {
                alert("Error fetching data from Admin JSON");
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        }

        fetchData(); // Call the function to fetch data

    }, [setAdminUsername, setAdminEmail, setAdminPassword]); // Dependency array should have state setters

    if (loading) {
        return <p>Loading admin data...</p>;
    }


    function getTo(destination) {
        navigate(`/${destination}`);
    }

    return (
        <div>
            <div className="adminPageMainParent">
                <div className="adminPageContainer container">
                    <div className="adminPageRow row m-0 p-0">
                        <div className="adminPageColumn col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="adminPageGreetingContainer">
                                <h1 className="adminPageGreeting">Welcome, Mr. {adminUsername}!</h1>
                                <h4>You are now viewing the management panel of Expensewise. </h4>
                                <h4>As an administrator, you can oversee the financial health of all users, manage their accounts, and ensure everything runs smoothly.
                                    Keep track of user activities, analyze income and expense trends,
                                    and maintain a seamless financial experience for everyone on the platform.
                                </h4>
                            </div>

                            <div className="adminPageButtonsContainer">
                                <button className="adminPageButtons" onClick={() => getTo("AdminDashBoard")}>DashBoard</button>
                                <button className="adminPageButtons" onClick={() => getTo("ManageUsers")}> Manage Users</button>
                                <button className="adminPageButtons" onClick={() => getTo("Transactions")}> Transactions </button>
                                <button className="adminPageButtons" onClick={() => getTo("Reports")}> Reports </button>
                                <button className="adminPageButtons" onClick={() => getTo("Settings")}> Settings </button>
                                <button className="adminPageButtons" onClick={() => getTo("Logout")}> Logout  </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default AdminPage;
