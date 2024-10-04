import React from 'react';
import "../Styles/NavBar.css";
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody
} from 'reactstrap';
import { useState, useContext } from 'react';
import { DataContext } from '../Components/App.js';
import PlaceholderImg from "../Assets/ProfilePlaceholder.jpg";




const PersonalInfoOffCanvas = ({ personalInfoIsOpen, togglePersonalInfoBtn }) => {


    const { totalExpense,
        setTotalExpense,
        expenseTransactions,
        setExpensetransactions,
        username,
        password,
        email } = useContext(DataContext);


    return (
        <div>
            <div style={{ borderRadius: "10px" }}>
                <Offcanvas toggle={togglePersonalInfoBtn} direction="start" isOpen={personalInfoIsOpen} className="personalInfoOffCanvasContainer" style={{ backgroundColor: "#F0F8FF", height: "90%", borderRadius: "7px", overflow: "hidden" }} >
                    <OffcanvasHeader toggle={togglePersonalInfoBtn} className="offCanvasHeaderForPersonalInformation">
                        <div className="profileInfoHedaerContainer">
                            <h3 style={{ textAlign: 'center', width: "100%" }} className="personalInfoHeading">Personal Information</h3>
                        </div>
                    </OffcanvasHeader>
                    <OffcanvasBody className="personalInfoBodyParent">

                        <div className="personalInfoImageContainer" style={{ marginTop: "3%" }}>
                            <img src={PlaceholderImg} alt="Profile Photo" width={100} height={100} />
                            <input type="file" />
                        </div>

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Username:</h5>
                            <p className="personalInfoBodyParagraphs">{username}</p>
                            <button className="btn btn-success p-1" style={{ width: "16%" }}>Edit</button>
                        </div>

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Full Name:</h5>
                            <p className="personalInfoBodyParagraphs">surya</p>
                            <button className="btn btn-success p-1" style={{ width: "16%" }}>Edit</button>
                        </div>

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Email:</h5>
                            <p className="personalInfoBodyParagraphs">{email}</p>
                            <button className="btn btn-success p-1" style={{ width: "16%" }}>Edit</button>
                        </div>

                        <div className="personalInfoBodySubContainers" style={{ marginBottom: "7%" }}>
                            <h5 className="personalInfoBodyHeadings">Mobile No:</h5>
                            <p className="personalInfoBodyParagraphs">8903091256</p>
                            <button className="btn btn-success p-1 " style={{ width: "16%" }}>Edit</button>
                        </div>

                    </OffcanvasBody>
                </Offcanvas>
            </div>

        </div>
    )
}

export default PersonalInfoOffCanvas
