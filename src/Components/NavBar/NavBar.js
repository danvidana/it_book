import React from "react";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import "./NavBar.css"
// Componente del Menu

const NavBar = () => {
	return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">IT-BOOK</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#home">¿Quienes somos?</Nav.Link>
                    <Nav.Link href="#link">CSOFTMTY</Nav.Link>
                    <Nav.Link href="#link">Iniciar Sesión</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )       
};

export default NavBar;