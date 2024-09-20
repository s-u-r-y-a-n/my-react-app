
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



function NavBar(args) {


  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="NavBar" >
        <Navbar {...args} color="light" expand="md" dark={false} light={true} container="xl">
          <NavbarBrand href="/" className="NavbarBrand">pantaloon</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>

            <Nav className="navBarforSearchBar me-auto" navbar>
              <NavItem className="searchBarContainer">
                <input type="search"
                  name="search"
                  placeholder="Search for a product or brand"
                  id="searchBar"
                  className="searchBar" />
                <label htmlFor="searchBar" className="ms-1">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="searchIcon" />
                </label>
              </NavItem>
            </Nav>

            <Nav className="NavbarForItems me-auto" navbar>
              <NavItem>
                <NavLink className="NavLink">
                  Men
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="NavLink">
                  Women
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="NavLink">
                  Kids
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="NavLink">
                  Home
                </NavLink>
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
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default NavBar;