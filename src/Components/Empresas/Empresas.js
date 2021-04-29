import React, { useContext, useEffect, useState, Fragment } from "react";
import Empresa from "./Empresa/Empresa";
import SearchBar from "../SearchBar/SearchBar";
import { CardDeck, Container } from "react-bootstrap";
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
						empresa={empresa}
						setEmpresa={props.setEmpresa}
						/*
						nombre={empresa.nombre_comercial}
						giro={empresa.giro}
						email={empresa.email}
						descripcion={empresa.descripcion}
						*/
					/>
				);
			});
			console.log(listaEmpresas);
			setEmpresa(listaEmpresas);
		});
	}, [firebase,nombre]);
	return  <Fragment>
				<SearchBar setName = {setName}/>
				<Container style={{minWidth: "90%"}}>
					<CardDeck style={{width:"100%", margin: "0px"}}>{empresas}</CardDeck>
				</Container>
			</Fragment>	
	
};

export default Empresas;

