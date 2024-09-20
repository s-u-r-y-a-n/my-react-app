import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import "../Styles/StartingPage.css";
import AdminLogo from "../Assets/icons8-admin-94.png";
import ExistingUser from "../Assets/existingUser.png";
import NewUser from "../Assets/newUsers.png";
import { Link } from "react-router-dom";


const StartingPage = () => {
    return (
        <div className="startingPageMainParent">
            <div className="container startingPageContainer">
                <div className="row m-0 p-0 startingPageRow">

                    <div className="col-lg-3 col-md-4 col-sm-12 col-12 startingPageColumn">

                        <Link to="/AdminLogin" className="StartingPageLinks">
                            <Card
                                className="startingPageCards"
                                body
                                style={{
                                    width: '14rem',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <img
                                    alt="Sample"
                                    src={AdminLogo}
                                    style={{ width: "140px", height: "140px" }}
                                />
                                <CardBody style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    <CardTitle tag="h5">
                                        Admin
                                    </CardTitle>
                                    {/* <CardText>
                                    Some quick example text to build on the card title and make up the bulk of the card‘s content.
                                </CardText> */}
                                    {/* <Button className="startingPageButtons">
                                    Button
                                </Button> */}
                                </CardBody>
                            </Card>
                        </Link>
                    </div>



                    <div className="col-lg-3 col-md-4 col-sm-12 col-12 startingPageColumn">
                        <Link to="/Login" className="StartingPageLinks">
                            <Card
                                body
                                className="startingPageCards"
                                style={{
                                    width: '14rem',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <img
                                    alt="Sample"
                                    src={ExistingUser}
                                    style={{ width: "140px", height: "140px" }}

                                />
                                <CardBody style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    <CardTitle tag="h5">
                                        Existing Users
                                    </CardTitle>
                                    {/* <CardText>
                                    Some quick example text to build on the card title and make up the bulk of the card‘s content.
                                </CardText> */}
                                    {/* <Button style={{ width: "100%" }}>
                                    Button
                                </Button> */}
                                </CardBody>
                            </Card>
                        </Link>

                    </div>



                    <div className="col-lg-3 col-md-4 col-sm-12 col-12 startingPageColumn">
                        <Link to="/Register" className="StartingPageLinks">
                            <Card
                                body
                                className="startingPageCards"
                                style={{
                                    width: '14rem',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <img
                                    alt="Sample"
                                    src={NewUser}
                                    style={{ width: "140px", height: "140px" }}
                                />
                                <CardBody style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    <CardTitle tag="h5">
                                        New User
                                    </CardTitle>
                                    {/* <CardText>
                                    Some quick example text to build on the card title and make up the bulk of the card‘s content.
                                </CardText> */}
                                    {/* <Button style={{ width: "100%" }}>
                                    Button
                                </Button> */}
                                </CardBody>
                            </Card>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartingPage
