import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import "./CustomNavbar.css";

const CustomNavbar = () => {
  return (
    <Navbar bg='info' expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
        <FaFileMedical />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto navbar-nav-right">
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login/patient">Patient<FaUserEdit />
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login/doctor">Doctor<FaUserDoctor />
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Register" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/register/patient">Patient<FaUserEdit />
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register/doctor">Doctor<FaUserDoctor />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
