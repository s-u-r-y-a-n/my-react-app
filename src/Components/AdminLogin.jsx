import React, { useEffect, useState } from 'react';
import "../Styles/AdminLoginPage.css";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Components/App.js';
import { useContext } from 'react';
import axios from 'axios';



const AdminLogin = () => {

    const { adminUsername, setAdminUsername } = useContext(DataContext);
    const { adminPassword, setAdminPassword } = useContext(DataContext);
    const { adminEmail, setAdminEmail } = useContext(DataContext);
    const { adminData, setAdminData } = useContext(DataContext);

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(
        function callBack() {
            async function fetchUsers() {
                try {
                    const response = await axios.get("http://localhost:4000/AdminInformation");
                    setAdminData(response.data);
                    console.log(response.data);
                } catch (error) {
                    alert("Error from fetching data from admin.json");
                    console.error("Error from fetching data from admin.json", error);
                }
            }
            fetchUsers();
        }, [adminUsername, adminEmail, adminPassword]
    );


    function handleClick(e) {
        e.preventDefault();
        const match = adminData.find((user) => user.Username === adminUsername && user.Password === adminPassword && user.Email === adminEmail);
        const user = adminData.find((info) => info.Username === adminUsername);
        const pass = adminData.find((info) => info.Password === adminPassword);
        const mail = adminData.find((info) => info.Email === adminEmail);
        if (match) {
            setAdminUsername("");
            setAdminPassword("");
            setAdminEmail("");
            // Save admin info to localStorage
            localStorage.setItem("loggedAdminInfo", JSON.stringify({
                username: match.Username,
                email: match.Email,
                password: match.Password
            }));
            navigate("/AdminPage");


        }

        else if (adminUsername.trim() === "" || adminEmail.trim() === "" || adminPassword.trim() === "") {
            alert("UserFields Should Not Be Empty!.");
        }

        else if (!user) {
            alert("Invalid Username");
            setAdminUsername("");
        }

        else if (!pass) {
            alert("Invalid Password");
            setAdminPassword("");
        }

        else if (!mail) {
            alert("Invalid Email");
            setAdminEmail("");
        }

        else {
            alert("Invalid Credentials");
            setAdminUsername("");
            setAdminPassword("");
            setAdminEmail("");
        }

    }

    return (
        <div className="adminLoginMainPage">
            <div className="container adminLoginContainer">
                <div className="row p-0 m-0 adminLoginRow">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 adminPageBgImageBox">
                        <div className="adminPageBgImage"></div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 adminPageLoginBox">
                        <Form className="actualAdminLogin">
                            <h4 style={{ fontFamily: "product sans, sans-serif" }}>Login as a admin user</h4> <br />
                            <FormGroup>
                                <Label for="username">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter Your Username"
                                    type="text"
                                    className="adminLoginInputFields"
                                    onChange={(e) => setAdminUsername(e.target.value)}
                                    value={adminUsername}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    type="email"
                                    className="adminLoginInputFields"
                                    onChange={(e) => setAdminEmail(e.target.value)}
                                    value={adminEmail}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    type="password"
                                    className="adminLoginInputFields"
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    value={adminPassword}
                                />
                            </FormGroup>

                            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
                                <button className="btn btn-primary p-2" id="adminPageBtn" onClick={handleClick}>
                                    LOGIN
                                </button>
                            </FormGroup>

                        </Form>





                        {adminData && adminData.length > 0 ? (
                            <ul>
                                {adminData.map((info) => (
                                    <li key={info.Username}>
                                        <div>{info.Username}</div>
                                        <div>{info.Password}</div>
                                        <div>{info.Email}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading admin data...</p> // Show loading message while data is being fetched
                        )}







                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminLogin
