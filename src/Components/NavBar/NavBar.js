import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
// Componente del Menu

const NavBar = () => {
	return (
		<Navbar expand='lg' bg='dark' variant='dark'>
			<Navbar.Brand as={Link} to='/'>
				IT-BOOK
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					<Nav.Link as={Link} to='/'>
						Home
					</Nav.Link>
					<Nav.Link as={Link} to='/registrar-empresa'>
						Registrar Empresa
					</Nav.Link>
					<Nav.Link as={Link} to='/quienes-somos'>
						¿Quienes somos?
					</Nav.Link>
					<Nav.Link as={Link} to='/csoft-mty'>
						CSOFTMTY
					</Nav.Link>
					<Nav.Link as={Link} to='/login'>
						Iniciar Sesión
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
