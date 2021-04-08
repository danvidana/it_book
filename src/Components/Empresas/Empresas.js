import React, { useContext, useEffect, useState } from "react";
import Empresa from "./Empresa/Empresa";
import { CardDeck } from "react-bootstrap";
import { FirebaseContext } from "../../API/index";

const Empresas = (props) => {
	const firebase = useContext(FirebaseContext);
	const [empresas, setEmpresa] = useState([]);

	useEffect(() => {
		firebase.getAllEmpresas().then((result) => {
			let listaEmpresas = result.map((empresa) => {
				console.log(empresa);
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
	}, [firebase]);
	return <CardDeck>{empresas}</CardDeck>;
};

export default Empresas;
