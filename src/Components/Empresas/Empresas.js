import React, { useContext, useEffect, useState, Fragment } from "react";
import Empresa from "./Empresa/Empresa";
import SearchBar from "../SearchBar/SearchBar";
import { CardDeck } from "react-bootstrap";
import { FirebaseContext } from "../../API/index";


const Empresas = (props) => {
	const firebase = useContext(FirebaseContext);
	const [empresas, setEmpresa] = useState([]);
	const [nombre, setNombre] = useState('');
	const setName = (Name) =>{
		setNombre(Name);
	};
	
	useEffect(() => {
		firebase.getEmpresasByName(nombre).then((result) => {
			let listaEmpresas = result.map((empresa) => {
				return (
					<Empresa
						key={empresa.id}
						nombre={empresa.nombre_comercial}
						giro={empresa.giro}
						email={empresa.email}
						descripcion={empresa.descripcion}
					/>
				);
			});
			console.log(listaEmpresas);
			setEmpresa(listaEmpresas);
		});
	}, [firebase,nombre]);
	return  <Fragment>
				<SearchBar setName = {setName}/>
				<CardDeck>{empresas}</CardDeck>
			</Fragment>	
	
};

export default Empresas;
