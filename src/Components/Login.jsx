import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import "../Styles/Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DataContext } from '../Components/App.js';
import { useContext } from 'react';

const Login = () => {

    const { username, setUsername } = useContext(DataContext);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [data, setUserdata] = useState([]);
    const navigate = useNavigate();


    useEffect(

        function callBack() {
            async function fetchUsers() {
                try {
                    const response = await axios.get("http://localhost:3000/UserInformation");
                    setUserdata(response.data)
                } catch (error) {
                    alert("Error From Fetching Data In Login Component");
                    console.error("Error From Fetching Data In Login Component", error);
                }
            }
            fetchUsers();

        }, []);


    function handleClick() {
        const match = data.find((info) => info.Username === username && info.Email === email && info.Password === password);
        const user = data.find((info) => info.Username === username);
        const pass = data.find((info) => info.Password === password);
        const mail = data.find((info) => info.Email === email);

        if (match) {
            navigate("/UserPage");
        }

        else if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
            alert("UserFields Should Not Be Empty!.");
        }

        else if (!user) {
            alert("Invalid Username");
            setUsername("");
        }

        else if (!pass) {
            alert("Invalid Password");
            setPassword("");
        }

        else if (!mail) {
            alert("Invalid Email");
            setEmail("");
        }

        else {
            alert("Invalid Credentials");
            setUsername("");
            setPassword("");
            setEmail("");
        }

    }



    return (
        <>
            <div className="mainParent">
                <div className="container CONTAINER">
                    <div className="row m-0 p-0 ROW">
                        <div className="loginPage col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="headerContainer m-0 p-0">
                                <h2 className="header m-0 p-0">Login Form</h2>
                            </div>
                            <Form className="form">
                                <FormGroup>
                                    <Label for="username">
                                        Username
                                    </Label>
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
                                    <Label for="email">
                                        Email
                                    </Label>
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
                                    <Label for="password">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        value={password}
                                        placeholder="Enter Your Password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormGroup>
                                <div className="textHeader">
                                    <p className="rememberMe">Remember me</p>
                                    <p className="forgotPassword"><a href="#">Forgot password?</a></p>
                                </div>
                                <FormGroup style={{ display: "flex", justifyContent: "center" }}>
                                    <button className="loginBtn" onClick={handleClick}>Login</button>
                                </FormGroup>
                            </Form>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5%" }}>
                                <p>Not a member?</p>    <Link to="/Register" style={{ margin: "0px", padding: "0px" }}> <p><a href="#">Signup now</a></p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
