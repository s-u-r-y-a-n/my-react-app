
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';
import "../Styles/EditUserInfo.css";
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


const EditUserInfo = ({
    editUserInfoIsOpen,
    toggleEditUserInfoBtn,
    selectedUser,
    setDisplayUserData,
    displayUserData
}) => {

    const [updatedUsers, setUpdatedUsers] = useState({});

    useEffect(() => {
        if (selectedUser) {
            setUpdatedUsers(selectedUser); // Set the initial form data to the selected user's current details
        }
    }, [selectedUser]);


    async function handleUpdateSubmit(e) {
        e.preventDefault();

        const editConfirmation = window.confirm("Are you sure want to update the changes ?");

        
        if (updatedUsers && updatedUsers.id && editConfirmation) {
            try {
                await axios.put(`http://localhost:3000/UserInformation/${updatedUsers.id}`, updatedUsers);
                // Update the local state after successful edit
                const updatedUserList = displayUserData.map(user =>
                    user.id === updatedUsers.id ? updatedUsers : user
                );
                setDisplayUserData(updatedUserList);
                toggleEditUserInfoBtn(); // Close the offcanvas after update
            } catch (error) {
                alert('Error updating user details');
                console.error('Error updating user:', error);
            }
        }
    }


    function handleInputChange(e) {
        const { name, value } = e.target;
        setUpdatedUsers((prev) => ({
            ...prev,
            [name]: value,
        }));
    }



    return (
        <div className="editUserInfoOffCanvasContainer">
            <Offcanvas toggle={toggleEditUserInfoBtn}
                isOpen={editUserInfoIsOpen}
                className="editUserInfoOffCanvas">
                <OffcanvasHeader toggle={toggleEditUserInfoBtn} className="editUserInfoOffcanvasHeader">
                    <h4 className="editUserInfoOffcanvasHead">Edit User's Personal Details</h4>
                </OffcanvasHeader>
                <OffcanvasBody style={{ width: "100%" }}>
                    <Form className="editUserInfoForm"
                        onSubmit={handleUpdateSubmit}
                    >
                        <FormGroup>
                            <Label for="username">
                                <strong> Username</strong>
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="Edit Username"
                                type="text"
                                onChange={handleInputChange}
                                value={updatedUsers.Username || ''}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                <strong>Password</strong>
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Edit Password"
                                type="password"
                                onChange={handleInputChange}
                                value={updatedUsers.Password || ''}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="FirstName">
                                <strong>First Name</strong>
                            </Label>
                            <Input
                                id="FirstName"
                                name="FirstName"
                                placeholder="Edit First Name"
                                type="text"
                                onChange={handleInputChange}
                                value={updatedUsers.FirstName || ''}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="LastName">
                                <strong>Last Name</strong>
                            </Label>
                            <Input
                                id="LastName"
                                name="LastName"
                                type="text"
                                placeholder="Edit Last Name"
                                onChange={handleInputChange}
                                value={updatedUsers.LastName || ''}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Email">
                                <strong>Email</strong>
                            </Label>
                            <Input
                                id="Email"
                                name="Email"
                                type="email"
                                placeholder="Edit Email"
                                onChange={handleInputChange}
                                value={updatedUsers.Email || ''}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Mobile">
                                <strong>Mobile</strong>
                            </Label>
                            <Input
                                id="Mobile"
                                name="Mobile"
                                type="number"
                                placeholder="Edit Mobile Number"
                                onChange={handleInputChange}
                                value={updatedUsers.Mobile || ''}

                            />
                        </FormGroup>
                        <FormGroup>
                            <button className="btn btn-success" style={{ width: "100%" }}>
                                Update
                            </button>
                        </FormGroup>

                    </Form>
                </OffcanvasBody>
            </Offcanvas>
        </div>
    )
}

export default EditUserInfo


