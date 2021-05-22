import React from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
// import businessImg from "../../images/detalleEmpresa_business.jpg";
import facebookIcon from "../../images/facebook.png";
import instagramIcon from "../../images/instagram.png";
import linkedinIcon from "../../images/linkedin.png";
import youtubeIcon from "../../images/youtube.png";
import { CurrentUserContext } from "../../CurrentUserContext";
import "./DetalleEmpresa.css";

const DetalleEmpresa = (props) => {
	const { currentUser } = React.useContext(CurrentUserContext);

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

	const privInfoSection = () => {
		if ((currentUser.userData.isAdmin || currentUser.userData.isSubadmin) || (currentUser.userData.empresaID === props.datosEmpresa.id)) {
			return (
				<div>
					<hr></hr>
					<Row className='text-left h3'>Información Privada:</Row>
					<Row>
						<Col className='mb-4' stule={{padding: "0px 20px"}}>
							<Row className='row_contacto mt-3 mb-1'>
								<Col sm='6'>
									<div className='row_descripcion border-it_book font-weight-bold'>
										CEO
									</div>
									<div className="font-weight-bold">
										{props.datosEmpresa.nombre_ceo}
									</div>
									{(props.datosEmpresa.tel_ceo !== 0) && <div>
										{props.datosEmpresa.tel_ceo}
									</div>}
									{(props.datosEmpresa.email_ceo !== "") && <div>
										{props.datosEmpresa.email_ceo}
									</div>}
								</Col>
								<Col sm='6'>
									<div className='row_descripcion border-it_book font-weight-bold'>
										CIO
									</div>
									<div className="font-weight-bold">
										{props.datosEmpresa.nombre_cio}
									</div>
									{(props.datosEmpresa.tel_cio !== 0) && <div>
										{props.datosEmpresa.tel_ceo}
									</div>}
									{(props.datosEmpresa.email_cio !== "") && <div>
										{props.datosEmpresa.email_cio}
									</div>}
								</Col>
							</Row>
							<Row className='justify-content-center' style={{padding:"10px"}}><h4>Empleados</h4></Row>
							<Row>
								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										En México
									</div>
									<div>{props.datosEmpresa.num_emp_mx}</div>
								</Col>
									
								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										En Nuevo León
									</div>
									<div>{props.datosEmpresa.num_emp_nl}</div>
								</Col>
								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										Fuera de México
									</div>
									<div>{props.datosEmpresa.num_emp_nomx}</div>
								</Col>
								
							</Row>
							<Row className='justify-content-center mb-4'>
								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										En área de TI
									</div>
									<div>{props.datosEmpresa.num_emp_ti}</div>
								</Col>
								
								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										Administradores
									</div>
									<div>{props.datosEmpresa.num_emp_adm}</div>
								</Col>
							</Row>
							<Row className='justify-content-center h4'>Ventas</Row>
							<Row className='mb-4'>
								<Col>
									<div className='col_descripcion border-it_book'>
										Anuales
									</div>
									<div>{props.datosEmpresa.ventas_anuales}</div>
								</Col>
									
								<Col>
									<div className='col_descripcion border-it_book'>
										Nacionales
									</div>
									<div>{props.datosEmpresa.ventas_nat}</div>
								</Col>
								<Col>
									<div className='col_descripcion border-it_book'>
										Extranjero
									</div>
									{props.datosEmpresa.ventas_ext !== "" &&  <div>{props.datosEmpresa.ventas_ext}</div>}
									{props.datosEmpresa.ventas_ext === "" &&  <div>$0</div>}

								</Col>
							</Row>
							<Row className='justify-content-center h4'>Certificaciones</Row>
							<Row className='mb-3'>
								<Col sm='6'>
									<div className='col_descripcion border-it_book'>
										Certificaciones de la empresa
									</div>
									<div>
										<span className='col_descripcion'>Cantidad:</span> {props.datosEmpresa.num_cert_empresa}
									</div>
									<div>
										{Object.entries(
											props.datosEmpresa.cert_empresa
										).map(function ([index, value]) {

											return <p style={{margin:"0px"}}>{value}</p>;
										})}
									</div>
								</Col>
								<Col sm='6'>
									<div className='col_descripcion border-it_book'>
										Certificaciones de empleados
									</div>
									<div>
									<span className='col_descripcion'>Cantidad:</span>  {props.datosEmpresa.num_cert_empleado}
									</div>
									<div>
										{props.datosEmpresa.cert_empleado}
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			);
		}
	}

	return (
		<Container>
			<div className='detalleEmpresa_wrapper'>
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
				<Row className='mb-2'>
					<Col md='8' className='' style={{paddingTop:"5px", paddingBottom:"5px"}}>
						<Row className='text-left row_contacto'>
							<Col xs='3' style={{padding:"0px 5px"}} className='row_descripcion '>
								E-mail:
							</Col>
							<Col xs='9' style={{padding:"0px 5px"}}>{props.datosEmpresa.email}</Col>
						</Row>
						<Row className='text-left row_contacto'>
							<Col xs='3' style={{padding:"0px 5px"}} className='row_descripcion'>
								Teléfono:
							</Col>
							<Col xs='9' style={{padding:"0px 5px"}}>{props.datosEmpresa.telefono}</Col>
						</Row>
						<Row className='text-left row_contacto'>
							<Col xs='3' style={{padding:"0px 5px"}} className='row_descripcion'>
								Dirección:
							</Col>
							<Col xs='9' style={{padding:"0px 5px"}}>
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
				{privInfoSection()}
			</div>
		</Container>
	);
};

export default DetalleEmpresa;
