import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://via.placeholder.com/50" // Replace with your logo URL
            alt="Doctor Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login/patient">Patient Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login/doctor">Doctor Login</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Register" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/register/patient">Patient Register</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register/doctor">Doctor Register</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
