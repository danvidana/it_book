import React from "react";
import classes from "./App.module.css";
import Empresas from "./Components/Empresas/Empresas";
import FormEmpresa from "./Components/FormEmpresa/FormEmpresa";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
	const empresas = {
		empresa1: {
			nombre: "empresa1",
			id: 1,
		},
		empresa2: {
			nombre: "empresa2",
			id: 2,
		},
	};

	return (
		<BrowserRouter>
			<div className={classes.App}>
				<NavBar />
				<Route path='/' exact>
					<Empresas listaEmpresas={empresas} />
				</Route>
				<Route path='/registrar-empresa'>
					<FormEmpresa />
				</Route>
			</div>
		</BrowserRouter>
	);
}

export default App;
