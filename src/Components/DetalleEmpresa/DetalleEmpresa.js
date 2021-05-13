import React from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import businessImg from "../../images/detalleEmpresa_business.jpg";
import "./DetalleEmpresa.css";
import { Link } from "react-router-dom";



const DetalleEmpresa = (props) => {
	console.log(props.datosEmpresa)
	/*
    useEffect(() => {
		firebase.getEmpresasByName(props.nombreEmpresa).then((result) => {
			datosEmpresa = result[0];
            //console.log(datosEmpresa);
			//setEmpresa(datosEmpresa);
            console.log(datosEmpresa);
		});
	}, [firebase,props.nombreEmpresa]);
    */

	return (
		<Container>
			<div className='detalleEmpresa_wrapper mb-5'>
				<Row className='mt-5 text-left h1'>
					{props.datosEmpresa.nombre_comercial}
				</Row>
				<Row className='text-left h4' style={{ color: "#f05d29" }}>
					{props.datosEmpresa.giro}
				</Row>
				<Row>
					<img
						className='imgBorder'
						style={{ width: "100%" }}
						src={businessImg}
						alt='Logo de Empresa'
						/>
				</Row>
				<Row className='text-left mb-2 m-4' style={{ 'font-size': "1.25rem"}}>
					{props.datosEmpresa.descripcion}
				</Row>
				<hr></hr>
				<Row className="text-center justify-content-center my-4 row_contacto">
					<a class="btn btn-it-book" href={props.datosEmpresa.pagina_web} role="button">Página Web</a>
				</Row>
				<Row className='text-left h3'>
					Información de Contacto:
				</Row>
				<Row>
					<Col className="col-md-8 col-sm-12">
						
						<Row className="text-left row_contacto">
							<Col className="row_descripcion ">
								E-mail:
							</Col>
							<Col>
								{props.datosEmpresa.email}
							</Col>
						</Row>
						<Row className="text-left row_contacto">
							<Col className="row_descripcion">
								Teléfono:
							</Col>
							<Col>
								{props.datosEmpresa.telefono}
							</Col>
						</Row>
						<Row className="text-left row_contacto">
							<Col className="row_descripcion">
								Dirección:
							</Col>
							<Col>
								{props.datosEmpresa.domicilio}, {props.datosEmpresa.colonia}, {props.datosEmpresa.municipio} 
							</Col>
						</Row>
					</Col>
					<Col className="col-md-4 col-sm-12 imgBorder">
						<Row className="justify-content-center">
							Ofrece sus servicios en:
						</Row>
						<Row className="justify-content-center font-weight-bold">
							{props.datosEmpresa.paises_exp_princ}
						</Row>
					</Col>
				</Row>
			</div>
		</Container>
	);
};

export default DetalleEmpresa;
