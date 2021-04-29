import React, { useState } from "react";
import classes from "./App.module.css";
import Empresas from "./Components/Empresas/Empresas";
import FormEmpresa from "./Components/FormEmpresa/FormEmpresa";
import NavBar from "./Components/NavBar/NavBar";
import RegistroUsuario from "./Components/RegistroUsuario/RegistroUsuario";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CurrentUserProvider } from "./CurrentUserContext";
import DetalleEmpresa from "./Components/DetalleEmpresa/DetalleEmpresa";

const App = () => {
	const [empresa, setEmpresa] = useState({});


	return (
		<CurrentUserProvider>
			<BrowserRouter>
				<div className={classes.App}>
					<NavBar />
					<Route path='/' exact>
						{/* <div className={classes.empresasContainer}> */}
							<Empresas setEmpresa = {setEmpresa} />
							<br />
						{/* </div> */}
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
					
					<Route path='/empresa/:id'>
						<DetalleEmpresa datosEmpresa={empresa}/>
					</Route>

				</div>
			</BrowserRouter>
		</CurrentUserProvider>
	);
};

export default App;
