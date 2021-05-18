import React, { Fragment, useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../API";
import { CurrentUserContext } from "../../CurrentUserContext";
import "./NavBar.css";
import usericon from "../../images/user-icon.png";
// Componente del Menu

const NavBar = () => {
	const firebase = useContext(FirebaseContext);
	const { currentUser, fetchCurrentUser } =
		React.useContext(CurrentUserContext);

	const [adminPanel, setAdminPanel] = useState(null);
	const [signedIn, setSignedIn] = useState(
		<Fragment>
			<Nav.Link as={Link} to='/registrar-usuario'>
				Registrarse
			</Nav.Link>
			<Nav.Link as={Link} to='/login'>
				Iniciar Sesión
			</Nav.Link>
		</Fragment>
	);
	useEffect(() => {
		if (currentUser !== null) {
			setSignedIn(
				<NavDropdown
					title={
						<img
							id='user-image'
							src={usericon}
							alt='user'
							width='25'
							height='25'
						/>
					}
					id='nav-dropdown'
					alignRight
				>
					{currentUser.userData.hasEmpresa ? (
						<NavDropdown.Item
							as={Link}
							to={
								"/modificar-empresa/" +
								currentUser.userData.empresaID
							}
						>
							Modificar Empresa
						</NavDropdown.Item>
					) : (
						<NavDropdown.Item as={Link} to='/registrar-empresa'>
							Registrar Empresa
						</NavDropdown.Item>
					)}
					<NavDropdown.Item
						as={Link}
						to='/'
						onClick={() => {
							console.log(currentUser);
							firebase.signout();
							fetchCurrentUser();
						}}
					>
						Cerrar Sesión
					</NavDropdown.Item>
				</NavDropdown>
			);
			if (currentUser.userData !== undefined) {
				if (currentUser.userData.isAdmin) {
					setAdminPanel(
						<Nav.Link as={Link} to='/admin-panel'>
							Admin Panel
						</Nav.Link>
					);
				} else {
					setAdminPanel(null);
				}
			}
		} else {
			setSignedIn(
				<Fragment>
					<Nav.Link as={Link} to='/registrar-usuario'>
						Registrarse
					</Nav.Link>
					<Nav.Link as={Link} to='/login'>
						Iniciar Sesión
					</Nav.Link>
				</Fragment>
			);
		}
	}, [currentUser, fetchCurrentUser, firebase]);

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
					<Nav.Link
						as={Link}
						to={{ pathname: "https://www.csoftmty.org/" }}
						target='_blank'
					>
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
