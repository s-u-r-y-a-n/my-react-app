import React from 'react';
import "../Styles/HomePage.css";
import CarouselComponent from './CarouselComponent';

const HomePage = () => {
  return (
    <div className="homePageMainParent">
      <div className="homePageContainer container">
        <div className="homePageRow row m-0 p-0">
          <div className="homePageColumn col-lg-12 col-md-12 col-sm-12 col-12">
            <div style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h1 className="homePageHeader">Welcome to ExpenseWise</h1>
            </div>
            <div style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h4>"Your smart way to track, manage, and control your finances effortlessly."</h4>
            </div>
            <div style={{ width: "100%", marginTop: "2%" }}>
              <CarouselComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
