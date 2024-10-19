import React, { useEffect, useState, useContext } from 'react';
import "../Styles/Register2.css";
import axios from "axios";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const Register2 = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userData, setUserdata] = useState([]);

    const navigate = useNavigate();

    useEffect(

        function callBack() {
            async function fetchUsers() {
                try {
                    const response = await axios.get("http://localhost:3000/UserInformation");
                    setUserdata(response.data);
                    console.log(userData);
                } catch (error) {
                    alert("Error From Fetching Users In The Register Page");
                    console.error("Error From Fetching Users In The Register Page", error);
                }
            }

            fetchUsers();
        }, [userData]);

    async function sendUserData(e) {
        e.preventDefault();

        const match = userData.find((info) => info.Username === username && info.Email === email);
        const user = userData.find((info) => info.Username === username);
        const mail = userData.find((info) => info.Email === email);

        if (match) {
            alert("Username and Email has already been taken");
            setUserName("");
            setEmail("");
        } else if (user) {
            alert("Username has already been taken");
            setUserName("");
        } else if (mail) {
            alert("Email has already been taken");
            setEmail("");
        }

        else {
            try {
                const newUsers = await axios.post("http://localhost:3000/UserInformation", {
                    Username: username,
                    Password: password,
                    Email: email,
                    Mobile: mobileNumber,
                    FirstName: firstName,
                    LastName: lastName,
                    Expenses: [],
                    Incomes: [],
                    ProfilePhoto: ""
                });
                console.log(newUsers);
                alert("Registered Succesfully!, Now go back to Login Page to login");
                navigate("/Login");
                setUserName("");
                setEmail("");
                setPassword("");
                setMobileNumber("");
                setFirstName("");
                setLastName("");
                setConfirmPassword("");


            }
            catch (error) {
                alert("Error from Registering user details");
                console.error("Error from Registering user details", error);
                setUserName("");
                setEmail("");
                setPassword("");
                setMobileNumber("");
                setFirstName("");
                setLastName("");
                setConfirmPassword("");
            }
        }
    }

    return (
        <>
            <div className="register2mainParent">
                <div className="container CONTAINER">
                    <div className="row m-0 p-0 ROW register2PageRow">
                        <div className="registerPageGreetingsAndPageParent col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="register2LoginPageGreetingsContainer">
                                <div className="register2LoginPageGreetingsHeaderParent">
                                    <h1>Hello and welcome to Expensewise!</h1>
                                </div>
                                <div className="register2LoginPageGreetingsContextParent">
                                    <h4>
                                        A great tool for managing your incomes as well as expenses. You can easily track all your transactions,
                                        whether it's adding new ones, editing existing entries, or deleting outdated records. And also You can
                                        track your transactions, filter them easily, and see detailed reports
                                        as charts.
                                    </h4>
                                </div>
                            </div>
                            <div className="register2LoginPageParent">
                                <div className="register2LoginPage">
                                    <div className="register2PageHeaderContainer m-0 p-0">
                                        <h2 className="register2PageHeader m-0 p-0">Register Form</h2>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <span style={{ color: "red", fontWeight: "bold" }}>All Fields Are Mandatory</span>
                                    </div>
                                    <Form className="register2Pageform" action="post" onSubmit={sendUserData}>

                                        <div className="firstAndLastNameContainer">
                                            <FormGroup className="dualInputForms">
                                                <Label for="firstName">
                                                    <strong>First Name</strong>
                                                </Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Enter Your First Name"
                                                    value={firstName}
                                                    type="text"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </FormGroup>

                                            <FormGroup className="dualInputForms">
                                                <Label for="lastName">
                                                    <strong>Last Name</strong>
                                                </Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Enter Your Last Name"
                                                    value={lastName}
                                                    type="text"
                                                    onChange={(e) => setLastName(e.target.value)}

                                                />
                                            </FormGroup>
                                        </div>

                                        <FormGroup >
                                            <Label for="username">
                                                <strong>Create Your Username</strong>
                                            </Label>
                                            <Input
                                                id="username"
                                                name="username"
                                                placeholder="Create Your Username"
                                                value={username}
                                                type="text"
                                                onChange={(e) => setUserName(e.target.value)}
                                                minLength="5"
                                                required

                                            />
                                        </FormGroup>

                                        <div className="emailAndMobileContainer">
                                            <FormGroup className="dualInputForms">
                                                <Label for="email">
                                                    <strong>Enter Your Email</strong>
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

                                            <FormGroup className="dualInputForms">
                                                <Label for="mobileNumber">
                                                    <strong>Enter Your Mobile No.</strong>
                                                </Label>
                                                <Input
                                                    id="mobileNumber"
                                                    name="mobileNumber"
                                                    placeholder="Enter Your Mobile Number"
                                                    value={mobileNumber}
                                                    type="text"
                                                    onChange={(e) => setMobileNumber(e.target.value)}
                                                />
                                            </FormGroup>
                                        </div>

                                        <div className="passwordConfirmPasswordContainer">
                                            <FormGroup className="dualInputForms">
                                                <Label for="password">
                                                    <strong> Password</strong>
                                                </Label>
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    value={password}
                                                    placeholder="Enter Your Password"
                                                    type="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    minLength="5"
                                                    required
                                                />
                                            </FormGroup>

                                            <FormGroup className="dualInputForms">
                                                <Label for="confirmPassword">
                                                    <strong>Confirm Password</strong>
                                                </Label>
                                                <Input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={confirmPassword}
                                                    placeholder="Re-enter Your Password"
                                                    type="password"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    minLength="5"
                                                    required
                                                />
                                            </FormGroup>
                                        </div>
                                        <FormGroup style={{ display: "flex", justifyContent: "center", marginBottom: "5%" }}>
                                            <button className="register2LoginBtn" type="submit">Register</button>
                                        </FormGroup>

                                        {/* <FormGroup style={{ display: "flex", justifyContent: "center", marginBottom: "5%" }}>
                                    <button className="backToLoginBtn" onClick={() => navigate("/Login")}>Back to Login Page</button>
                                </FormGroup> */}

                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Register2
