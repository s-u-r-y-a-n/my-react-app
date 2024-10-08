import React, { useEffect, useState, useContext } from 'react';
import "../Styles/NavBar.css";
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody
} from 'reactstrap';
import { DataContext } from '../Components/App.js';
import PlaceholderImg from "../Assets/ProfilePlaceholder.jpg";
import axios from 'axios';

const PersonalInfoOffCanvas = ({ personalInfoIsOpen, togglePersonalInfoBtn }) => {
    const [userData, setUserdata] = useState(null); // Initially, set to null to handle loading state

    const { username, email } = useContext(DataContext); // Destructure the username and email from DataContext
    const [image, setImage] = useState("");

    useEffect(() => {
        // Check if username is available
        if (username) {
            async function fetchData() {
                try {
                    // Fetch user data based on the username
                    const response = await axios.get(`http://localhost:3000/UserInformation?Username=${username}`);
                    setUserdata(response.data[0]); // Assuming the first result is the correct user
                    console.log("User Data Fetched:", response.data[0]);
                } catch (error) {
                    alert("Error fetching data in Personal Info Offcanvas component");
                    console.error(error);
                }
            }
            fetchData(); // Call the function to fetch data
        }
    }, [username]); // Add username as a dependency, so it refetches if the username changes

    if (!userData) {
        return <p>Loading...</p>; // Return loading state while data is being fetched
    }
    console.log(image);

    return (
        <div>
            <div style={{ borderRadius: "10px" }}>
                <Offcanvas
                    toggle={togglePersonalInfoBtn}
                    direction="start"
                    isOpen={personalInfoIsOpen}
                    className="personalInfoOffCanvasContainer"
                    style={{ backgroundColor: "#F0F8FF", height: "90%", borderRadius: "7px", overflow: "hidden" }}
                >
                    <OffcanvasHeader toggle={togglePersonalInfoBtn} className="offCanvasHeaderForPersonalInformation">
                        <div className="profileInfoHedaerContainer">
                            <h3 style={{ textAlign: 'center', width: "100%" }} className="personalInfoHeading">Personal Information</h3>
                        </div>
                    </OffcanvasHeader>
                    <OffcanvasBody className="personalInfoBodyParent">
                        <div className="personalInfoImageContainer" style={{ marginTop: "3%" }}>
                            <img src={PlaceholderImg} alt="Profile Photo" width={100} height={100} />
                            <input type="file" onChange={(e) => setImage(e.target.value)} />
                        </div>

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Username:</h5>
                            <p className="personalInfoBodyParagraphs">{userData.Username}</p> {/* Using userData */}
                            <button className="btn btn-success p-1" style={{ width: "16%" }}>Edit</button>
                        </div>

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Full Name:</h5>
                            <p className="personalInfoBodyParagraphs">{`${userData.FirstName} ${userData.LastName}`}</p> {/* Assuming FullName exists */}
                            <button className="btn btn-success p-1" style={{ width: "16%" }}>Edit</button>
                        </div>

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Email:</h5>
                            <p className="personalInfoBodyParagraphs">{userData.Email}</p>
                            <button className="btn btn-success p-1" style={{ width: "16%" }}>Edit</button>
                        </div>

                        <div className="personalInfoBodySubContainers" style={{ marginBottom: "7%" }}>
                            <h5 className="personalInfoBodyHeadings">Mobile No:</h5>
                            <p className="personalInfoBodyParagraphs">{userData.Mobile}</p> {/* Assuming MobileNo exists */}
                            <button className="btn btn-success p-1 " style={{ width: "16%" }}>Edit</button>
                        </div>
                    </OffcanvasBody>
                </Offcanvas>
            </div>
        </div>
    );
};

export default PersonalInfoOffCanvas;
