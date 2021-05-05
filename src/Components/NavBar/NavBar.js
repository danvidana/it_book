import React, { Fragment, useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../API";
import { CurrentUserContext } from "../../CurrentUserContext";
import "./NavBar.css";
import usericon from "../../images/user-icon.png";
// Componente del Menu

const NavBar = () => {
	const firebase = useContext(FirebaseContext);
	const { currentUser, fetchCurrentUser } = React.useContext(
		CurrentUserContext
	);
	let adminPanel = null;
	let signedIn = (
		<Fragment>
			<Nav.Link as={Link} to='/registrar-usuario'>
				Registrarse
			</Nav.Link>
			<Nav.Link as={Link} to='/login'>
				Iniciar Sesión
			</Nav.Link>
		</Fragment>
	);

	if (currentUser !== null) {
		signedIn = (
			<Nav.Link
				as={Link}
				to='/'
				onClick={() => {
					console.log(currentUser);
					firebase.signout();
					fetchCurrentUser();
				}}
			>
				Cerrar Sesión
			</Nav.Link>
		);
		if (currentUser.isAdmin === "true") {
			adminPanel = (
				<Nav.Link as={Link} to='/admin-panel'>
					Admin Panel
				</Nav.Link>
			);
		}
	}
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
					<Nav.Link as={Link} to='/quienes-somos'>
						¿Quienes somos?
					</Nav.Link>
					<Nav.Link as={Link} to={{pathname: "https://www.csoftmty.org/"}} target="_blank">
						CSOFTMTY
					</Nav.Link>
					{adminPanel}
					{signedIn}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
