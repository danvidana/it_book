import React from "react";
import classes from "./App.module.css";
import Empresas from "./Components/Empresas/Empresas";
import FormEmpresa from "./Components/FormEmpresa/FormEmpresa";
import NavBar from "./Components/NavBar/NavBar";
import RegistroUsuario from "./Components/RegistroUsuario/RegistroUsuario";
import Login from "./Components/Login/Login";
import SearchBar from "./Components/SearchBar/SearchBar"
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CurrentUserProvider } from "./CurrentUserContext";

const App = () => {
	return (
		<CurrentUserProvider>
			<BrowserRouter>
				<div className={classes.App}>
					<NavBar />
					<Route path='/' exact>
						<SearchBar />
						<Container className={classes.empresasContainer}>
							<Empresas />
						</Container>
					</Route>
					<Route path='/registrar-empresa'>
						<FormEmpresa />
					</Route>

					<Route path='/login'>
						<Login />
					</Route>

					<Route path='/registrar-usuario'>
						<RegistroUsuario />
					</Route>
				</div>
			</BrowserRouter>
		</CurrentUserProvider>
	);
};

export default App;
