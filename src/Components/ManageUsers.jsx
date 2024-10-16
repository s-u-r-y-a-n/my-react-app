import { useState, useEffect, useContext } from "react";
import { DataContext } from './App';
import axios from "axios";
import "../Styles/ManageUsers.css";
import { Card, CardBody, CardTitle, CardSubtitle, Button, CardText } from "reactstrap";
import EditUserInfo from "./EditUserInfo";
import { FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const { totalUsers, adminUsername } = useContext(DataContext);
    const [displayUserData, setDisplayUserData] = useState([]);
    const [editUserInfoIsOpen, setEditUserInfoIsOpen] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);


    const toggleEditUserInfoBtn = (info) => {
        setEditUserInfoIsOpen(!editUserInfoIsOpen);
        setSelectedUser(info);
    };

    const navigate = useNavigate();

    useEffect(
        function callBack() {
            async function fetchAllUsers() {
                try {
                    const response = await axios.get("http://localhost:3000/UserInformation");
                    setDisplayUserData(response.data);
                    setFilteredUsers(response.data);
                } catch (error) {
                    alert("Error fetching all users in the Manage Users component");
                    console.error("Error fetching all users in the Manage Users component", error);
                }
            }
            fetchAllUsers();
        }, []
    );


    //Filter Users By Search Query
    useEffect(() => {
        const filtered = displayUserData.filter(user => {
            // Filter by search term
            const matchesSearchTerm =
                user.Username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.Mobile.toString().includes(searchQuery) ||
                user.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.LastName.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSearchTerm;
        });

        setFilteredUsers(filtered);
    }, [searchQuery]);


    async function deleteUser(userId, Username) {
        const confirmation = window.confirm(`Are you sure want to delete ${Username}'s account ? `);

        if (confirmation) {
            try {
                await axios.delete(`http://localhost:3000/UserInformation/${userId}`);
                // After successful deletion from the server, update the local state to reflect the changes
                const updatedUsers = displayUserData.filter(user => user.id !== userId);
                setDisplayUserData(updatedUsers);
            } catch (error) {
                alert("Error from deleting user in the manager users component");
                console.error("Error from deleting user in the manager users component", error);
            }
        }
    }

    function clearSearch() {
        setFilteredUsers(displayUserData);
        setSearchQuery("");
    }

    function getTo(destination, userId) {
        navigate(`/${destination}`, { state: { userId: userId } });
    }

    return (
        <div className="manageUsersMainParent">
            <div className="manageUsersContainer container">
                <div className="manageUsersRow row m-0 p-0">
                    <div className="manageUsersColumn col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="manageUsersGreetingContainer">
                            <div className="manageUsersGreetingsSubContainer">
                                <h1>Hello, {adminUsername}</h1>
                            </div>
                            <div className="manageUsersGreetingsSubContainer">
                                <h3>Welcome to Manage Users Page.</h3>
                            </div>
                            <div className="manageUsersGreetingsSubContainer">
                                <h4>On this page, you can view, edit, and delete user accounts.</h4>
                            </div>
                        </div>
                    </div>

                    <FormGroup className="searchBoxContainer">
                        <Label for="search" style={{ fontSize: "1.5rem", marginRight: "10px" }}>
                            <strong>Search:</strong>
                        </Label>
                        <Input
                            id="search"
                            name="search"
                            placeholder="Search Users By Username, Mobile, Email..."
                            type="search"
                            style={{ width: "50%", margin: "0", padding: "10px" }}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                        <button className="btn btn-warning"
                            style={{ height: "100%", fontWeight: "600" }}
                            onClick={clearSearch}>
                            Clear Search
                        </button>
                    </FormGroup>

                    <div className="manageUsersCardContainer" >
                        {filteredUsers.map((info, index) => (

                            <Card style={{ width: '18rem' }} className="manageUsersCard" key={index}>
                                {/* <img alt="User Avatar" src="https://picsum.photos/300/200" /> */}
                                <CardBody style={{
                                    width: "100%", height: "100%",
                                    display: "flex", flexDirection: "column", gap: "5%"
                                }}>
                                    <CardTitle tag="h5" style={{
                                        display: "flex", justifyContent: "center",
                                        height: "10%", fontSize: "1.7rem", alignItems: "center"
                                    }}>
                                        <div>{info.Username}</div>
                                    </CardTitle>
                                    <CardSubtitle className="mb-2 text-muted manageUsersCardSubHeadings" tag="h6">
                                        <div style={{ width: "40%" }}><strong>Full Name:</strong></div>
                                        <div style={{ width: "60%" }}>{`${info.FirstName} ${info.LastName}`}</div>
                                    </CardSubtitle>
                                    <CardSubtitle className="mb-2 text-muted manageUsersCardSubHeadings" tag="h6">
                                        <div style={{ width: "40%" }}><strong>Email:</strong></div>
                                        <div style={{ width: "60%" }}>{info.Email}</div>
                                    </CardSubtitle>
                                    <CardSubtitle className="mb-2 text-muted manageUsersCardSubHeadings" tag="h6">
                                        <div style={{ width: "40%" }}><strong>Mobile:</strong></div>
                                        <div style={{ width: "60%" }}>{info.Mobile}</div>
                                    </CardSubtitle>
                                    <CardSubtitle className="mb-2 text-muted manageUsersCardSubHeadings" tag="h6">
                                        <div style={{ width: "40%" }}><strong>Password:</strong></div>
                                        <div style={{ width: "60%" }}>{info.Password}</div>
                                    </CardSubtitle>
                                    {/* <CardText>
                                        Some quick example text to build on the card title and make up the bulk of the card’s content.
                                    </CardText> */}
                                    <div className="manageUsersCardSubHeadings">
                                        <button className="btn btn-warning"
                                            onClick={() => toggleEditUserInfoBtn(info)}
                                            style={{ width: "45%" }}>Edit</button>
                                        <button className="btn btn-danger"
                                            onClick={() => deleteUser(info.id, info.Username)}
                                            style={{ width: "45%" }}>Delete</button>
                                    </div>
                                    <div>
                                        <button className="btn btn-success"
                                            style={{ width: "95%" }}
                                            onClick={() => getTo("UsersTransactions", info.id)}
                                        >View Transactions</button>
                                    </div>

                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>

                <div style={{ width: "100%" }}>
                    <EditUserInfo
                        editUserInfoIsOpen={editUserInfoIsOpen}
                        toggleEditUserInfoBtn={toggleEditUserInfoBtn}
                        selectedUser={selectedUser}
                        displayUserData={displayUserData}
                        setDisplayUserData={setDisplayUserData}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
