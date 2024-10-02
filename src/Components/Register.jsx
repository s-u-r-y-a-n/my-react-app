import React, { useEffect, useState } from 'react';
import "../Styles/Register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Register = () => {

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
                    Expenses: [],
                    Incomes: []
                });
                console.log(newUsers);
                alert("Registered Succesfully!, Now go back to Login Page to login");
                setUserName("");
                setEmail("");
                setPassword("");

            }
            catch (error) {
                alert("Error from Registering user details");
                console.error("Error from Registering user details", error);
                setUserName("");
                setEmail("");
                setPassword("");
            }
        }
    }


    return (
        <>
            <div className="registerPageMainParent">
                <div className="registerPageContainer container">
                    <form action="post" onSubmit={sendUserData}>
                        <div className="registerPageRow row m-0 p-0">

                            <div className="registerPage col-lg-4 col-md-4 col-sm-12 col-12">
                                <div className="registerPageHeaderContainer">
                                    <h2 className="registerPageHeader">Register Form</h2>
                                </div>

                                <div className="registerPageBox">
                                    <div style={{ padding: "12px", margin: "5% 0 0% 0" }}>



                                        <div style={{ marginBottom: "2%" }}>
                                            <label htmlFor="username">Username</label>
                                        </div>
                                        <div style={{ width: "100%" }}>
                                            <input
                                                style={{ width: "100%", padding: "4px", borderRadius: "5px", border: "2px solid rgba(0, 0, 0, 0.2)" }}
                                                type="text"
                                                id="username"
                                                name="username"
                                                className="registerUsernameField"
                                                placeholder="Create a Username"
                                                value={username}
                                                minLength="5"
                                                required
                                                onChange={(e) => setUserName(e.target.value)}
                                            />

                                        </div>
                                    </div>


                                    <div style={{ padding: "12px", margin: "1% 0 0% 0" }}>
                                        <div style={{ marginBottom: "2%" }}>
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div style={{ width: "100%" }}>
                                            <input
                                                style={{ width: "100%", padding: "4px", borderRadius: "5px", border: "2px solid rgba(0, 0, 0, 0.2)" }}
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="registerEmailField"
                                                placeholder="Enter Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                minLength="5"

                                            />

                                        </div>
                                    </div>


                                    <div style={{ padding: "12px", marginBottom: "5%" }}>
                                        <div style={{ marginBottom: "2%" }}>
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div style={{ width: "100%" }}>
                                            <input
                                                style={{ width: "100%", padding: "4px", borderRadius: "5px", border: "2px solid rgba(0, 0, 0, 0.2)" }}
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={password}
                                                className="registerPasswordField"
                                                placeholder="Create a Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                minLength="5"

                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "5%" }}>
                                        <button className="registerBtn" type="submit">Register</button>
                                    </div>

                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "5%" }}>
                                <button className="backToLoginBtn" onClick={() => navigate("/Login")}>Back to Login Page</button>

                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Register
