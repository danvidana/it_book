import React from "react";
import classes from "./App.module.css";
import Empresas from "./Components/Empresas/Empresas";
import FormEmpresa from "./Components/FormEmpresa/FormEmpresa";
import NavBar from "./Components/NavBar/NavBar";
import RegistroUsuario from "./Components/RegistroUsuario/RegistroUsuario"
import Login from "./Components/Login/Login"
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
	const empresas = {
		empresa1: {
			nombre_comercial: "Código Naranja",
			giro: "Soluciones empresariales",
			descripcion: "Empresa regiomontana con experiencia en creación de soluciones web y IoT.",
			email: "contacto@naranja.com",
			id: 1,
		},
		empresa2: {
			nombre_comercial: "Nintendo of America",
			giro: "Entretenimiento",
			descripcion: "Líder tecnológico de videojuegos familiares.",
			email: "support@nintendolatam.com",
			id: 2,
		},
		empresa3: {
			nombre_comercial: "Nintendo of America",
			giro: "Entretenimiento",
			descripcion: "Líder tecnológico de videojuegos familiares.",
			email: "support@nintendolatam.com",
			id: 3,
		},
		empresa4: {
			nombre_comercial: "Nintendo of America",
			giro: "Entretenimiento",
			descripcion: "Líder tecnológico de videojuegos familiares.",
			email: "support@nintendolatam.com",
			id: 4,
		},
		empresa5: {
			nombre_comercial: "Nintendo of America",
			giro: "Entretenimiento",
			descripcion: "Líder tecnológico de videojuegos familiares.",
			email: "support@nintendolatam.com",
			id: 5,
		},
		empresa6: {
			nombre_comercial: "Nintendo of America",
			giro: "Entretenimiento",
			descripcion: "Líder tecnológico de videojuegos familiares.",
			email: "support@nintendolatam.com",
			id: 6,
		},
		empresa7: {
			nombre_comercial: "Nintendo of America",
			giro: "Entretenimiento",
			descripcion: "Líder tecnológico de videojuegos familiares.",
			email: "support@nintendolatam.com",
			id: 7,
		},
		empresa8: {
			nombre_comercial: "Nintendo of America",
			giro: "Entretenimiento",
			descripcion: "Líder tecnológico de videojuegos familiares.",
			email: "support@nintendolatam.com",
			id: 8,
		},
		empresa9: {
			nombre_comercial: "Nintendo of America",
			giro: "Entretenimiento",
			descripcion: "Líder tecnológico de videojuegos familiares.",
			email: "support@nintendolatam.com",
			id: 9,
		},
		
	};

	return (
		<BrowserRouter>
			<div className={classes.App}>
				<NavBar />
				<Route path='/' exact>
					<Container className={classes.empresasContainer}>
							<Empresas listaEmpresas={empresas} />
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
	);
}

export default App;
