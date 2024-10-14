
import React, { useEffect, useState, useContext } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import "../Styles/Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DataContext } from '../Components/App.js';

const Login = () => {
    const { username, setUsername } = useContext(DataContext);
    const { password, setPassword } = useContext(DataContext);
    const { email, setEmail } = useContext(DataContext);
    const [data, setUserdata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:3000/UserInformation");
                setUserdata(response.data);
            } catch (error) {
                alert("Error From Fetching Data In Login Component");
                console.error("Error From Fetching Data In Login Component", error);
            }
        }
        fetchUsers();
    }, []);

    function handleClick() {
        const match = data.find((info) => info.Username === username && info.Email === email && info.Password === password);

        if (match) {
            // Save user info to localStorage
            localStorage.setItem("loggedInUser", JSON.stringify({
                username: match.Username,
                email: match.Email,
                password: match.Password
            }));
            navigate("/UserPage");
        } else {
            alert("Invalid Credentials");
            setUsername("");
            setPassword("");
            setEmail("");
        }
    }

    return (
        <div className="mainParent">
            <div className="container CONTAINER">
                <div className="row m-0 p-0 ROW">
                    <div className="loginPage col-lg-4 col-md-4 col-sm-4 col-12">
                        <div className="headerContainer m-0 p-0">
                            <h2 className="header m-0 p-0">Login Form</h2>
                        </div>
                        <Form className="form">
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter Your Username"
                                    value={username}
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="Enter Your Password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
                                <button className="loginBtn" type="button" onClick={handleClick}>Login</button>
                            </FormGroup>
                        </Form>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5%" }}>
                            <p>Not a member?</p>
                            <Link to="/Register2"><p><a href="#">Signup now</a></p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
