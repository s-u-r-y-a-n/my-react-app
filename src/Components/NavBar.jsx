
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  NavbarText,
} from 'reactstrap';
import "../Styles/NavBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Income from './Income';
import Expenses from './Expenses';
import Analytics from './Analytics';




function NavBar({ args, onLinkClick }) {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="NavBar" >
        <Navbar {...args} color="light" expand="md" dark={false} light={true} container="xl">
          <NavbarBrand href="/" className="NavbarBrand">ExpenseWise</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>

            <Nav className="navBarforSearchBar me-auto" navbar>
              <NavItem className="searchBarContainer">
                <input type="search"
                  name="search"
                  placeholder="Search transactions by Description or Category"
                  id="searchBar"
                  className="searchBar" />
                <label htmlFor="searchBar" className="ms-1">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="searchIcon" />
                </label>
              </NavItem>
            </Nav>

            <Nav className="NavbarForItems me-auto" navbar>

              <NavItem>
                {/* <Link to="/Dashboard" className="NavBarLinks"> */}
                  <NavLink className="NavLink" onClick={() => onLinkClick(<Dashboard />)}>
                    Dashboard
                  </NavLink>
                {/* </Link> */}
              </NavItem>

              <NavItem>
                {/* <Link to="/Income" className="NavBarLinks"> */}
                  <NavLink className="NavLink" onClick={() => onLinkClick(<Income />)}>
                    Income
                  </NavLink>
                {/* </Link> */}
              </NavItem>

              <NavItem>
                {/* <Link to="/Expenses" className="NavBarLinks"> */}
                  <NavLink className="NavLink" onClick={() => onLinkClick(<Expenses />)}>
                    Expenses
                  </NavLink>
                {/* </Link> */}
              </NavItem>

              <NavItem>
                {/* <Link to="/Analytics" className="NavBarLinks"> */}
                  <NavLink className="NavLink" onClick={() => onLinkClick(<Analytics />)}>
                    Analytics
                  </NavLink>
                {/* </Link> */}
              </NavItem>

              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
            <NavbarText>Profile</NavbarText>
          </Collapse>
        </Navbar>
      </div >
    </>
  );
}

export default NavBar;