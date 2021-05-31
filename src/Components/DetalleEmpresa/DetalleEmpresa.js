import React, { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
// import businessImg from "../../images/detalleEmpresa_business.jpg";
import facebookIcon from "../../images/facebook.png";
import instagramIcon from "../../images/instagram.png";
import linkedinIcon from "../../images/linkedin.png";
import youtubeIcon from "../../images/youtube.png";
import { CurrentUserContext } from "../../CurrentUserContext";
import "./DetalleEmpresa.css";
import { FirebaseContext } from "../../API";
import { useLocation } from "react-router";

const DetalleEmpresa = (props) => {
	const { currentUser } = React.useContext(CurrentUserContext);
	const firebase = useContext(FirebaseContext);
	console.log(currentUser);
	console.log(props.datosEmpresa);
	const [empresa, setEmpresa] = useState(props.datosEmpresa);
	const location = useLocation();

	if (
		empresa === null ||
		empresa === undefined ||
		Object.entries(empresa).length === 0
	) {
		const id = location.pathname.split("/").pop();
		firebase.getEmpresaByID(id).then((empresa) => {
			setEmpresa(empresa);
		});
	}

	const facebook = () => {
		if (empresa.facebook !== "") {
			return (
				<a
					href={empresa.facebook}
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
		if (empresa.instagram !== "") {
			return (
				<a
					href={empresa.instagram}
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
		if (empresa.youtube !== "") {
			return (
				<a
					href={empresa.youtube}
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
		if (empresa.linkedin !== "") {
			return (
				<a
					href={empresa.linkedin}
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
	let privInfoSection = null;

	if (
		currentUser !== null &&
		currentUser !== undefined &&
		empresa !== null &&
		empresa !== undefined &&
		Object.entries(empresa).length !== 0
	) {
		console.log(currentUser);
		if (
			currentUser.userData.isAdmin ||
			currentUser.userData.isSubadmin ||
			currentUser.userData.empresaID === empresa.id
		) {
			privInfoSection = (
				<div>
					<hr></hr>
					<Row className='text-left h3'>Información Privada:</Row>
					<Row>
						<Col className='mb-4' stule={{ padding: "0px 20px" }}>
							<Row className='row_contacto mt-3 mb-1'>
								<Col sm='6'>
									<div className='row_descripcion border-it_book font-weight-bold'>
										CEO
									</div>
									<div className='font-weight-bold'>
										{empresa.nombre_ceo}
									</div>
									{empresa.tel_ceo !== 0 && (
										<div>{empresa.tel_ceo}</div>
									)}
									{empresa.email_ceo !== "" && (
										<div>{empresa.email_ceo}</div>
									)}
								</Col>
								<Col sm='6'>
									<div className='row_descripcion border-it_book font-weight-bold'>
										CIO
									</div>
									<div className='font-weight-bold'>
										{empresa.nombre_cio}
									</div>
									{empresa.tel_cio !== 0 && (
										<div>{empresa.tel_ceo}</div>
									)}
									{empresa.email_cio !== "" && (
										<div>{empresa.email_cio}</div>
									)}
								</Col>
							</Row>
							<Row
								className='justify-content-center'
								style={{ padding: "10px" }}
							>
								<h4>Empleados</h4>
							</Row>
							<Row>
								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										En México
									</div>
									<div>{empresa.num_emp_mx}</div>
								</Col>

								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										En Nuevo León
									</div>
									<div>{empresa.num_emp_nl}</div>
								</Col>
								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										Fuera de México
									</div>
									<div>{empresa.num_emp_nomx}</div>
								</Col>
							</Row>
							<Row className='justify-content-center mb-4'>
								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										En área de TI
									</div>
									<div>{empresa.num_emp_ti}</div>
								</Col>

								<Col sm='4'>
									<div className='col_descripcion border-it_book'>
										Administradores
									</div>
									<div>{empresa.num_emp_adm}</div>
								</Col>
							</Row>
							<Row className='justify-content-center h4'>
								Ventas
							</Row>
							<Row className='mb-4'>
								<Col>
									<div className='col_descripcion border-it_book'>
										Anuales
									</div>
									<div>{empresa.ventas_anuales}</div>
								</Col>

								<Col>
									<div className='col_descripcion border-it_book'>
										Nacionales
									</div>
									<div>{empresa.ventas_nat}</div>
								</Col>
								<Col>
									<div className='col_descripcion border-it_book'>
										Extranjero
									</div>
									{empresa.ventas_ext !== "" && (
										<div>{empresa.ventas_ext}</div>
									)}
									{empresa.ventas_ext === "" && <div>$0</div>}
								</Col>
							</Row>
							<Row className='justify-content-center h4'>
								Certificaciones
							</Row>
							<Row className='mb-3'>
								<Col sm='6'>
									<div className='col_descripcion border-it_book'>
										Certificaciones de la empresa
									</div>
									<div>
										<span className='col_descripcion'>
											Cantidad:
										</span>{" "}
										{empresa.num_cert_empresa}
									</div>
									<div>
										{Object.entries(
											empresa.cert_empresa
										).map(function ([index, value]) {
											return (
												<p
													style={{
														margin: "0px",
													}}
												>
													{value}
												</p>
											);
										})}
									</div>
								</Col>
								<Col sm='6'>
									<div className='col_descripcion border-it_book'>
										Certificaciones de empleados
									</div>
									<div>
										<span className='col_descripcion'>
											Cantidad:
										</span>{" "}
										{empresa.num_cert_empleado}
									</div>
									<div>{empresa.cert_empleado}</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			);
		}
	}
	if (
		empresa === null ||
		empresa === undefined ||
		Object.entries(empresa).length === 0
	) {
		return null;
	} else {
		console.log(empresa);
		return (
			<Container>
				<div className='detalleEmpresa_wrapper'>
					<Row className='mt-5 text-left h1'>
						{empresa.nombre_comercial}
					</Row>
					<Row className='text-left h4' style={{ color: "#f05d29" }}>
						{empresa.giro}
					</Row>
					<Row>
						<img
							className='imgBorder'
							style={{ width: "100%" }}
							src={empresa.logo}
							alt='Logo de Empresa'
						/>
					</Row>
					<Row
						className='text-left mb-2 m-4'
						style={{ fontSize: "1.25rem" }}
					>
						{empresa.descripcion}
					</Row>
					<hr></hr>
					<Row className='text-center justify-content-center my-4 row_contacto'>
						<a
							className='btn btn-it-book'
							href={empresa.pagina_web}
							target='_blank'
							rel='noopener noreferrer'
							role='button'
						>
							Página Web
						</a>
					</Row>
					<Row className='text-left h3'>Información de Contacto:</Row>
					<Row className='mb-2'>
						<Col
							md='8'
							className=''
							style={{ paddingTop: "5px", paddingBottom: "5px" }}
						>
							<Row className='text-left row_contacto'>
								<Col
									xs='3'
									style={{ padding: "0px 5px" }}
									className='row_descripcion '
								>
									E-mail:
								</Col>
								<Col xs='9' style={{ padding: "0px 5px" }}>
									{empresa.email}
								</Col>
							</Row>
							<Row className='text-left row_contacto'>
								<Col
									xs='3'
									style={{ padding: "0px 5px" }}
									className='row_descripcion'
								>
									Teléfono:
								</Col>
								<Col xs='9' style={{ padding: "0px 5px" }}>
									(+{empresa.lada}) {empresa.telefono}
								</Col>
							</Row>
							<Row className='text-left row_contacto'>
								<Col
									xs='3'
									style={{ padding: "0px 5px" }}
									className='row_descripcion'
								>
									Dirección:
								</Col>
								<Col xs='9' style={{ padding: "0px 5px" }}>
									{empresa.domicilio}, {empresa.colonia},{" "}
									{empresa.municipio}, {empresa.cp}
								</Col>
							</Row>
						</Col>
						<Col md='4' className='imgBorder'>
							<Row className='justify-content-center'>
								Ofrece sus servicios en:
							</Row>
							<Row className='justify-content-center font-weight-bold'>
								{Object.entries(empresa.paises_exp_princ).map(
									function ([index, value]) {
										if (
											index <
											empresa.paises_exp_princ.length - 1
										) {
											return value + ", ";
										}

										return value;
									}
								)}
								{/* {empresa.paises_exp_princ} */}
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
					{privInfoSection}
				</div>
			</Container>
		);
	}
};

export default DetalleEmpresa;
