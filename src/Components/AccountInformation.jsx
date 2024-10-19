import React from 'react';
import "../Styles/NavBar.css";
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody
} from 'reactstrap';
import { useState, useContext } from 'react';
import { DataContext } from '../Components/App.js';


const AccountInformation = ({ accountInfoIsOpen, toggleAccountInfoBtn }) => {

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
                <Offcanvas toggle={toggleAccountInfoBtn} direction="start" isOpen={accountInfoIsOpen} className="personalInfoOffCanvasContainer" style={{ backgroundColor: "#F0F8FF", height: "90%", borderRadius: "7px", overflow: "hidden" }} >
                    <OffcanvasHeader toggle={toggleAccountInfoBtn} className="offCanvasHeaderForPersonalInformation">
                        <div className="profileInfoHedaerContainer">
                            <h3 style={{ textAlign: 'center', width: "100%" }} className="personalInfoHeading">Account Information</h3>
                        </div>
                    </OffcanvasHeader>
                    <OffcanvasBody className="personalInfoBodyParent">

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Account Creation Date:</h5>
                            <p className="personalInfoBodyParagraphs">{username}</p>
                        </div>

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Last Login Date</h5>
                            <p className="personalInfoBodyParagraphs">surya</p>
                            <button className="btn btn-success p-1" style={{ width: "16%" }}>Edit</button>
                        </div>

                        <div className="personalInfoBodySubContainers">
                            <h5 className="personalInfoBodyHeadings">Data Export</h5>
                            <p className="personalInfoBodyParagraphs">{email}</p>
                        </div>

                        <div className="personalInfoBodySubContainers" style={{ marginBottom: "7%" }}>
                            <h5 className="personalInfoBodyHeadings">FeedBack</h5>
                            <p className="personalInfoBodyParagraphs">8903091256</p>
                        </div>

                        <div className="personalInfoBodySubContainers" style={{ marginBottom: "7%" }}>
                            <h5 className="personalInfoBodyHeadings">Terms Of Service</h5>
                            <p className="personalInfoBodyParagraphs">8903091256</p>
                        </div>

                    </OffcanvasBody>
                </Offcanvas>
            </div>

        </div>
    )
}

export default AccountInformation
