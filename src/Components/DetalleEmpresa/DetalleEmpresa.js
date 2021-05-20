import React from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
// import businessImg from "../../images/detalleEmpresa_business.jpg";
import facebookIcon from "../../images/facebook.png";
import instagramIcon from "../../images/instagram.png";
import linkedinIcon from "../../images/linkedin.png";
import youtubeIcon from "../../images/youtube.png";
import "./DetalleEmpresa.css";

const DetalleEmpresa = (props) => {
	const facebook = () => {
		if (props.datosEmpresa.facebook !== "") {
			return (
				<a
					href={props.datosEmpresa.facebook}
					target='_blank'
					rel='noopener noreferrer'
				>
					<img
						style={{ width: "30px" }}
						src={facebookIcon}
						alt='Logo de Empresa'
					/>
				</a>
			);
		}
	};

	const instagram = () => {
		if (props.datosEmpresa.instagram !== "") {
			return (
				<a
					href={props.datosEmpresa.instagram}
					target='_blank'
					rel='noopener noreferrer'
				>
					<img
						style={{ width: "30px" }}
						src={instagramIcon}
						alt='Logo de Empresa'
					/>
				</a>
			);
		}
	};

	const youtube = () => {
		if (props.datosEmpresa.youtube !== "") {
			return (
				<a
					href={props.datosEmpresa.youtube}
					target='_blank'
					rel='noopener noreferrer'
				>
					<img
						style={{ width: "30px" }}
						src={youtubeIcon}
						alt='Logo de Empresa'
					/>
				</a>
			);
		}
	};

	const linkedin = () => {
		if (props.datosEmpresa.linkedin !== "") {
			return (
				<a
					href={props.datosEmpresa.linkedin}
					target='_blank'
					rel='noopener noreferrer'
				>
					<img
						style={{ width: "30px" }}
						src={linkedinIcon}
						alt='Logo de Empresa'
					/>
				</a>
			);
		}
	};

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
						src={props.datosEmpresa.logo}
						alt='Logo de Empresa'
					/>
				</Row>
				<Row
					className='text-left mb-2 m-4'
					style={{ fontSize: "1.25rem" }}
				>
					{props.datosEmpresa.descripcion}
				</Row>
				<hr></hr>
				<Row className='text-center justify-content-center my-4 row_contacto'>
					<a
						className='btn btn-it-book'
						href={props.datosEmpresa.pagina_web}
						target='_blank'
						rel='noopener noreferrer'
						role='button'
					>
						Página Web
					</a>
				</Row>
				<Row className='text-left h3'>Información de Contacto:</Row>
				<Row>
					<Col md='8' className='' style={{paddingTop:"5px", paddingBottom:"5px"}}>
						<Row className='text-left row_contacto'>
							<Col xs='auto' style={{padding:"0px 5px"}} className='row_descripcion '>
								E-mail:
							</Col>
							<Col xs='auto' style={{padding:"0px 5px"}}>{props.datosEmpresa.email}</Col>
						</Row>
						<Row className='text-left row_contacto'>
							<Col xs='auto' style={{padding:"0px 5px"}} className='row_descripcion'>
								Teléfono:
							</Col>
							<Col xs='auto' style={{padding:"0px 5px"}}>{props.datosEmpresa.telefono}</Col>
						</Row>
						<Row className='text-left row_contacto'>
							<Col xs='auto' style={{padding:"0px 5px"}} className='row_descripcion'>
								Dirección:
							</Col>
							<Col xs='auto' style={{padding:"0px 5px"}}>
								{props.datosEmpresa.domicilio},{" "}
								{props.datosEmpresa.colonia},{" "}
								{props.datosEmpresa.municipio},{" "}
								{props.datosEmpresa.cp}
							</Col>
						</Row>
					</Col>
					<Col md='4' className='imgBorder'>
						<Row className='justify-content-center'>
							Ofrece sus servicios en:
						</Row>
						<Row className='justify-content-center font-weight-bold'>
							{Object.entries(
								props.datosEmpresa.paises_exp_princ
							).map(function ([index, value]) {
								if (
									index <
									props.datosEmpresa.paises_exp_princ.length -
										1
								) {
									return value + ", ";
								}

								return value;
							})}
							{/* {props.datosEmpresa.paises_exp_princ} */}
						</Row>
					</Col>
				</Row>

				<Row style={{ padding: "10px 0px" }}>
					<Col xs='auto' style={{ padding: "0px 5px" }}>
						{linkedin()}
					</Col>
					<Col xs='auto' style={{ padding: "0px 5px" }}>
						{facebook()}
					</Col>
					<Col xs='auto' style={{ padding: "0px 5px" }}>
						{instagram()}
					</Col>
					<Col xs='auto' style={{ padding: "0px 5px" }}>
						{youtube()}
					</Col>
				</Row>
			</div>
		</Container>
	);
};

export default DetalleEmpresa;
