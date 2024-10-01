import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody
} from 'reactstrap';
import "../Styles/NavBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './Dashboard';
import Income from './Income';
import Expenses from './Expenses';
import Analytics from './Analytics';
import { DataContext } from '../Components/App.js';



function NavBar({ args, onLinkClick }) {

  const { totalExpense,
    setTotalExpense,
    expenseTransactions,
    setExpensetransactions,
    username } = useContext(DataContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [profileBtnIsOpen, setProfileBtnIsOpen] = useState(false);

  const toggleProfileBtn = () => {
    setProfileBtnIsOpen(!profileBtnIsOpen);
  };

  return (
    <>
      <div className="NavBar">
        <Navbar {...args} color="light" expand="md" dark={false} light={true} container="xl">
          <NavbarBrand href="/" className="NavbarBrand">ExpenseWise</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="navBarforSearchBar me-auto" navbar>
              <NavItem className="searchBarContainer">
                <input
                  type="search"
                  name="search"
                  placeholder="Search transactions by Description or Category"
                  id="searchBar"
                  className="searchBar"
                />
                <label htmlFor="searchBar" className="ms-1">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="searchIcon" />
                </label>
              </NavItem>
            </Nav>

            <Nav className="NavbarForItems me-auto" navbar>
              <NavItem>
                <NavLink className="NavLink" onClick={() => onLinkClick(<Dashboard />)}>
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="NavLink" onClick={() => onLinkClick(<Income />)}>
                  Income
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="NavLink" onClick={() => onLinkClick(<Expenses />)}>
                  Expenses
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="NavLink" onClick={() => onLinkClick(<Analytics />)}>
                  Analytics
                </NavLink>
              </NavItem>
            </Nav>

            <div>
              <NavbarText style={{ cursor: "pointer", padding: "7px", border: "2px solid black" }} onClick={toggleProfileBtn}>
                <FontAwesomeIcon icon={faUser} size="xl" />
              </NavbarText>

              <Offcanvas direction="end" isOpen={profileBtnIsOpen} toggle={toggleProfileBtn}>
                <OffcanvasHeader toggle={toggleProfileBtn} className="profileHedaerParent">
                  <div className="profileHedaerContainer" style={{textAlign: "center"}}>
                    <h3 style={{textAlign: 'center'}}>Hello {username}</h3>
                  </div>
                </OffcanvasHeader>
                <OffcanvasBody>
                  <div className="profilePageButtonsParent">
                    <div><button className="profilePageButtons">Personal Information</button></div>
                    <div><button className="profilePageButtons">Account Information</button></div>
                    <div><button className="profilePageButtons">Financial Overview</button></div>
                    <div><button className="profilePageButtons">Settings & Preferences</button></div>
                    <div><button className="profilePageButtons">Privacy & Security</button></div>
                  </div>
                </OffcanvasBody>
                <footer>
                  <h4>This is Footer</h4>
                </footer>
              </Offcanvas>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default NavBar;
