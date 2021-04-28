import React from "react";
import classes from "./App.module.css";
import Empresas from "./Components/Empresas/Empresas";
import FormEmpresa from "./Components/FormEmpresa/FormEmpresa";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import FormRegistro from "./Components/FormRegistro/FormRegistro";
import Login from "./Components/Login/Login";
import { CurrentUserProvider } from "./CurrentUserContext";

const App = () => {
	return (
		<CurrentUserProvider>
			<BrowserRouter>
				<div className={classes.App}>
					<NavBar />
					<Route path='/' exact>
						<Container className={classes.empresasContainer}>
							<Empresas />
						</Container>
					</Route>
					<Route path='/registrar-empresa'>
						<FormEmpresa />
					</Route>
					<Route path='/registrar-usuario'>
						<FormRegistro />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
				</div>
			</BrowserRouter>
		</CurrentUserProvider>
	);
};

export default App;
