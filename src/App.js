import React, { useState } from "react";
import classes from "./App.module.css";
import Empresas from "./Components/Empresas/Empresas";
import FormEmpresa from "./Components/FormEmpresa/FormEmpresa";
import NavBar from "./Components/NavBar/NavBar";
import {Button} from "react-bootstrap";

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

	const [show, setShow] = useState(false);

	return (
		<div className={classes.App}>

			<NavBar />
			
			<Empresas listaEmpresas={empresas} />

			<Button variant='primary' onClick={() => setShow(!show)}>
				Registrar Empresa
			</Button>
			<br />
			<div style={{ display: show ? "block" : "none" }}>
				<FormEmpresa />
			</div>
		</div>
	);
}

export default App;
