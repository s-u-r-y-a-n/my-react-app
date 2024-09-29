import React, { useEffect, useState } from 'react';
import "../Styles/AdminLoginPage.css";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {

    const [data, setData] = useState([]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(
        function callBack() {
            async function fetchUsers() {
                try {
                    const response = await axios.get("http://localhost:4000/AdminInformation");
                    setData(response.data);
                    console.log(data);
                } catch (error) {
                    alert("Error from fetching data from admin.json");
                    console.error("Error from fetching data from admin.json", error);
                }
            }
            fetchUsers();
        }, []
    );


    function handleClick(e) {
        e.preventDefault();
        const match = data.find((user) => user.Username === username && user.Password === password && user.Email === email);
        const user = data.find((info) => info.Username === username);
        const pass = data.find((info) => info.Password === password);
        const mail = data.find((info) => info.Email === email);
        if (match) {
            navigate("/AdminPage");
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
            setEmail("");
            setPassword("");
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
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </FormGroup>

                            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
                                <button className="btn btn-primary p-2" id="adminPageBtn" onClick={handleClick}>
                                    LOGIN
                                </button>
                            </FormGroup>

                        </Form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminLogin
