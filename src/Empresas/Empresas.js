import React, { Fragment } from "react";
import Empresa from "./Empresa/Empresa";

const Empresas = (props) => {
	let listaEmpresas = Object.keys(props.listaEmpresas)
		.map((key) => {
			return [...Array(props.listaEmpresas[key])].map((el, _) => {
				return <Empresa key={el.id} empresa={el} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);
	return <Fragment>{listaEmpresas}</Fragment>;
};

export default Empresas;
