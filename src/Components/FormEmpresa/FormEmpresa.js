import React, { useContext, useState, useEffect, useMemo } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { CurrentUserContext } from "../../CurrentUserContext";
import "./FormEmpresa.css";
import { useHistory, useLocation } from "react-router";
import MultiSelect from "react-multi-select-component";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

// Componente del formulario para dar de alta una empresa
const FormEmpresa = () => {
	const firebase = useContext(FirebaseContext);
	const [countries, setCountries] = useState([]);
	const [validated, setValidated] = useState(false);
	const [submitEnabled, setSubmitEnabled] = useState(true);
	const location = useLocation();
	const { currentUser, fetchCurrentUser } =
		React.useContext(CurrentUserContext);
	const history = useHistory();
	const modifying =
		location.pathname.startsWith("/modificar-empresa") &&
		location.pathname.split("/").pop() === currentUser.userData.empresaID;
	const [item, setItem] = useState({
		nombre_comercial: "",
		area: "",
		giro: "",
		descripcion: "",
		logo: "",
		domicilio: "",
		colonia: "",
		municipio: "",
		cp: "",
		lada: "",
		telefono: "",
		email: "",
		pagina_web: "",
		nombre_ceo: "",
		email_ceo: "",
		tel_ceo: 0,
		nombre_cio: "",
		email_cio: "",
		tel_cio: 0,
		razon_social: "",
		servicios: "",
		linkedin: "",
		facebook: "",
		instagram: "",
		youtube: "",
		num_emp_nl: NaN,
		num_emp_mx: NaN,
		num_emp_nomx: NaN,
		num_emp_ti: NaN,
		num_emp_adm: NaN,
		ventas_nat: "",
		ventas_ext: "",
		ventas_anuales: "",
		paises_exp_princ: [],
		num_cert_empresa: NaN,
		cert_empresa: [],
		num_cert_empleado: NaN,
		cert_empleado: "",
	});

	// diccionario de todas las opciones de giros por area
	const dict_giros = useMemo(() => {
		return {
			"Desarrollo de Software": [
				"Desarrollo Web",
				"Soluciones Tecnológicas",
				"Fintech",
				"Healthtech",
				"E-commerce",
				"Desarrollo a la medida",
			],
			Servicios: [
				"Facturación electrónica",
				"Staffing",
				"Software as a service",
				"Monitoreo de SW & HW",
				"Consultoría TIC",
				"Asesoría en propiedad intelectual en temas de tecnología",
				"Tratamiento de imagen",
				"Servicios de Telecomuicaciones",
				"Streaming y desarrollo de eventos virtuales",
			],
			Hardware: ["Uso de PLC", "Redes industriales"],
			"Tecnología 4.0": [
				"3D Printing",
				"Business Intelligence",
				"Big data y Analítica de datos",
				"Inteligencia artificial",
				"Robótica",
				"IoT",
				"Ciberseguridad",
				"Blockchain",
				"Nube",
			],
		};
	}, []);

	useEffect(() => {
		if (modifying) {
			firebase
				.getEmpresaByID(currentUser.userData.empresaID)
				.then((empresa) => {
					setItem(empresa);
					const arrayCountries = empresa.paises_exp_princ.map(
						(pais) => {
							return {
								value: pais,
								label: pais,
							};
						}
					);
					setArrayCountries(arrayCountries);
					setCertEmpleado(
						empresa.cert_empleado.map((certificacion) => {
							return {
								value: certificacion,
								label: certificacion,
							};
						})
					);
					setCertEmpresas(
						empresa.cert_empresa.map((certificacion) => {
							return {
								value: certificacion,
								label: certificacion,
							};
						})
					);
				});
		}
	}, [currentUser.userData.empresaID, firebase, modifying, dict_giros]);

	if (currentUser === null || currentUser === undefined) {
		history.push("/");
	} else if (!modifying && currentUser.userData.hasEmpresa) {
		history.push("/");
	}
	const dict_num_empleados = [
		{ value: 0 },
		{ value: 1 },
		{ value: 5 },
		{ value: 10 },
		{ value: 30 },
		{ value: 50 },
		{ value: 100 },
		{ value: 150 },
		{ value: 200 },
		{ value: 250 },
		{ value: 350 },
		{ value: 500 },
		{ value: 700 },
		{ value: 850 },
		{ value: 1000 },
		{ value: 5000 },
		{ value: 10000 },
		{ value: 20000 },
		{ value: 30000 },
		{ value: 50000 },
		{ value: 70000 },
	];

	const dict_rangos_ventas = [
		{ value: "Menor a $500,000" },
		{ value: "$500,000 a $1,000,000" },
		{ value: "$1,000,000 - $2,000,000" },
		{ value: "$2,000,000 - $5,000,000" },
		{ value: "$5,000,000 - $10,000,000" },
		{ value: "$10,000,000 - $50,000,000" },
		{ value: "Mayor a $50,000,000" },
	];

	const dict_num_certificaciones = [
		{ value: 0 },
		{ value: 1 },
		{ value: 2 },
		{ value: 3 },
		{ value: 4 },
		{ value: 5 },
		{ value: 10 },
		{ value: 30 },
		{ value: 50 },
	];

	const dict_certEmpleado = useMemo(() => {
		return [
			{
				label: "Google Certified Professional Cloud Architect",
				value: "Google Certified Professional Cloud Architect",
			},
			{
				label: "AWS Certified Solutions Architect – Associate",
				value: "AWS Certified Solutions Architect – Associate",
			},
			{
				label: "CISM – Certified Information Security Manager",
				value: "CISM – Certified Information Security Manager",
			},
			{
				label: "CRISC – Certified in Risk and Information Systems Control",
				value: "CRISC – Certified in Risk and Information Systems Control",
			},
			{
				label: "PMP® – Project Management Professional",
				value: "PMP® – Project Management Professional",
			},
			{
				label: "CISSP – Certified Information Systems Security Professional",
				value: "CISSP – Certified Information Systems Security Professional",
			},
			{
				label: "CISA – Certified Information Systems Auditor",
				value: "CISA – Certified Information Systems Auditor",
			},
			{
				label: "AWS Certified Cloud Practitioner",
				value: "AWS Certified Cloud Practitioner",
			},
			{
				label: "VCP6-DCV: VMware Certified Professional 6 – Data Center Virtualization",
				value: "VCP6-DCV: VMware Certified Professional 6 – Data Center Virtualization",
			},
			{
				label: "ITIL® Foundation",
				value: "ITIL® Foundation",
			},
			{
				label: "Microsoft Certified: Azure Fundamentals",
				value: "Microsoft Certified: Azure Fundamentals",
			},
			{
				label: "Microsoft Certified: Azure Administrator Associate",
				value: "Microsoft Certified: Azure Administrator Associate",
			},
			{
				label: "CCA-N: Citrix Certified Associate – Networking",
				value: "CCA-N: Citrix Certified Associate – Networking",
			},
			{
				label: "CCNP Routing and Switching",
				value: "CCNP Routing and Switching",
			},
			{
				label: "CCP-V: Citrix Certified Professional – Virtualization",
				value: "CCP-V: Citrix Certified Professional – Virtualization",
			},
		];
	}, []);

	const dict_certEmpresas = useMemo(() => {
		return [
			{
				label: "CMMI Nivel 2",
				value: "CMMI Nivel 2",
			},
			{
				label: "CMMI Nivel 3",
				value: "CMMI Nivel 3",
			},
			{
				label: "CMMI Nivel 5",
				value: "CMMI Nivel 5",
			},
			{
				label: "ISO 27001",
				value: "ISO 27001",
			},
			{
				label: "ISO 29110",
				value: "ISO 29110",
			},
			{
				label: "TSP",
				value: "TSP",
			},
			{
				label: "PSP",
				value: "PSP",
			},
		];
	}, []);

	// regresa las opciones areas
	const getAreas = function () {
		return [
			<option value='' key={0} disabled>
				Selecciona una opción
			</option>,
		].concat(
			Object.keys(dict_giros).map((key, index) => {
				return (
					<option key={index + 1} value={key}>
						{key}
					</option>
				);
			})
		);
	};

	// regresa las opciones de giros
	// se debe seleccionar un area primero
	const getGiros = function () {
		if (item.area === "") {
			return (
				<option key='' value=''>
					Selecciona una opción
				</option>
			);
		}
		return dict_giros[item.area].map((value, i) => {
			return (
				<option key={i} value={value}>
					{value}
				</option>
			);
		});
	};

	// Guarda el indice de dict_giros donde se encuentra el area seleccionada
	// guarda el primer elemento de los giros
	const updateArea = (e) => {
		// area
		let select_area = e.target.value;
		// primer giro del area
		let giro = dict_giros[e.target.value][0];

		setItem({
			...item,
			area: select_area,
			giro: giro,
		});
	};

	// lista de paises

	const [arrayCountries, setArrayCountries] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			var dict_countries = [];
			const searchURL = "https://restcountries.eu/rest/v2/all";
			const response = await fetch(searchURL);
			const responseData = await response.json();
			responseData.forEach((element) => {
				if (element["translations"]["es"] !== null) {
					dict_countries.push({
						label: element["translations"]["es"],
						value: element["translations"]["es"],
					});
				} else {
					dict_countries.push({
						label: element["name"],
						value: element["name"],
					});
				}
			});
			setCountries(dict_countries);
			// sort and remove duplicates
		};
		fetchData();
	}, []);

	// guarda en un arreglo los países seleccionados
	const handleChangeCountries = (selectedOptions) => {
		const selectedValues = selectedOptions.map((option) => {
			return option.value;
		});
		setArrayCountries(selectedOptions);
		setItem({
			...item,
			paises_exp_princ: selectedValues,
		});
	};

	// Imagen logo
	const [image, setImage] = useState(null);

	const handleImageChange = (e) => {
		let img = e.target.files[0];
		setImage(img);
	};

	// regresa las opciones de numeros de empleados
	const getNumEmpleados = function () {
		return [
			<option value='' key='0' disabled>
				Selecciona una opción
			</option>,
		].concat(
			Object.entries(dict_num_empleados).map(function ([index, key]) {
				return (
					<option key={index + 1} value={key["value"]}>
						{key["value"]}
					</option>
				);
			})
		);
	};

	// regresa los rangos de ventas
	const getRangosVentas = function () {
		return [
			<option value='' key='0' disabled>
				Selecciona una opción
			</option>,
		].concat(
			Object.entries(dict_rangos_ventas).map(function ([index, key]) {
				return (
					<option key={index + 1} value={key["value"]}>
						{key["value"]}
					</option>
				);
			})
		);
	};

	// regresa los numeros de certificaciones
	const getNumCertificaciones = function () {
		return [
			<option value='' key='0' disabled>
				Selecciona una opción
			</option>,
		].concat(
			Object.entries(dict_num_certificaciones).map(function ([
				index,
				key,
			]) {
				return (
					<option key={index + 1} value={key["value"]}>
						{key["value"]}
					</option>
				);
			})
		);
	};

	// Certificaciones empresa
	const [certEmpresas, setCertEmpresas] = useState([]);

	// guarda en un arreglo las certificaciones seleccionadas
	const handleSelectCertEmpresas = (selectedOptions) => {
		const selectedValues = selectedOptions.map((option) => {
			return option.value;
		});
		// console.log(selectedOptions)
		setCertEmpresas(selectedOptions);
		setItem({
			...item,
			cert_empresa: selectedValues,
		});
	};

	// Certificaciones empleados
	const [certEmpleado, setCertEmpleado] = useState([]);

	// guarda en un arreglo las certificaciones seleccionadas
	const handleSelectCertEmpleado = (selectedOptions) => {
		const selectedValues = selectedOptions.map((option) => {
			return option.value;
		});
		// console.log(selectedOptions)
		setCertEmpleado(selectedOptions);
		setItem({
			...item,
			cert_empleado: selectedValues,
		});
	};

	// función para subir cambios a la base de datos
	const submitChanges = async (event) => {
		event.preventDefault();
		let message = "Se ha subido la empresa";
		const form = event.currentTarget;
		try {
			// Verifica que ningún campo esté vacío
			if (form.checkValidity() === false) {
				message = "Campos sin responder";
				event.stopPropagation();
			} else {
				if (modifying) {
					message = "Se ha modificado la empresa!";
					const id = currentUser.userData.empresaID;
					firebase.updateEmpresa(id, item, image).then(() => {
						history.push("/");
					});
				} else {
					// Añade la empresa a la base de datos
					firebase.addEmpresa(item, image).then((empresa) => {
						firebase.setHasEmpresa(
							currentUser.uid,
							true,
							empresa.id
						);
						fetchCurrentUser();
						history.push("/");
					});
				}
			}
		} catch (e) {
			console.log(e);
			message =
				"Ha ocurrido un error, revise que toda la información sea correcta,\nY que tiene buena conexión de internet.";
		}
		setValidated(true);
		window.alert(message);
	};

	return (
		<Container id='formContainer'>
			<Form
				id='formEmpresa'
				noValidate
				validated={validated}
				onSubmit={submitChanges}
			>
				{/* <h2>IT-BOOK</h2> */}

				<div style={{ paddingBottom: "10px" }}>
					<h3 style={{ color: "#f05d29" }}>Registra tu empresa</h3>
				</div>

				<h5>Datos Públicos</h5>

				<h6>Datos generales</h6>
				<p>
					<small>Ingrese los datos universales de la empresa.</small>
				</p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Nombre Comercial</Form.Label>
							<Form.Control
								placeholder='Nombre Comercial'
								onChange={(str) => {
									setItem({
										...item,
										nombre_comercial:
											str.currentTarget.value,
									});
								}}
								value={item.nombre_comercial}
								required
							/>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Área</Form.Label>
							<Form.Control
								as='select'
								value={item.area}
								onChange={updateArea}
								required
							>
								{getAreas()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Giro / Especialidad</Form.Label>
							<Form.Control
								as='select'
								value={item.giro}
								onChange={(e) => {
									setItem({
										...item,
										giro: e.currentTarget.value,
									});
								}}
								required
							>
								{getGiros()}
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<Form.Group controlId=''>
					<Form.Label>Descipción</Form.Label>
					<Form.Control
						as='textarea'
						placeholder='Descipción de la empresa'
						onChange={(str) => {
							setItem({
								...item,
								descripcion: str.currentTarget.value,
							});
						}}
						value={item.descripcion}
						required
					/>
				</Form.Group>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Logo</Form.Label>
							<Form.File
								accept='image/*'
								label={
									image ? image.name : "Seleccionar imagen"
								}
								onChange={handleImageChange}
								custom
								required={!modifying}
							></Form.File>
						</Form.Group>
					</Col>
				</Row>

				<h6>Dirección</h6>
				<p>
					<small>Ingrese los datos de ubicación.</small>
				</p>

				<Row>
					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Calle y Número</Form.Label>
							<Form.Control
								placeholder='Calle #123'
								onChange={(str) => {
									setItem({
										...item,
										domicilio: str.currentTarget.value,
									});
								}}
								required
								value={item.domicilio}
							/>
						</Form.Group>
					</Col>

					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Colonia</Form.Label>
							<Form.Control
								placeholder='Colonia'
								onChange={(str) => {
									setItem({
										...item,
										colonia: str.currentTarget.value,
									});
								}}
								value={item.colonia}
								required
							/>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col sm={6} md={3} lg={4}>
						<Form.Group controlId=''>
							<Form.Label>Municipio</Form.Label>
							<Form.Control
								placeholder='Municipio'
								onChange={(str) => {
									setItem({
										...item,
										municipio: str.currentTarget.value,
									});
								}}
								value={item.municipio}
								required
							/>
						</Form.Group>
					</Col>

					<Col sm={6} md={3} lg={2}>
						<Form.Group controlId=''>
							<Form.Label>Código Postal</Form.Label>
							<Form.Control
								placeholder='Código Postal'
								type='text'
								pattern='[0-9]{5}'
								onChange={(str) => {
									setItem({
										...item,
										cp: parseInt(str.currentTarget.value),
									});
								}}
								value={item.cp || ""}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								Deben ser 5 dígitos
							</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col xs={7} sm={6} md={3} lg={4}>
						<Form.Group controlId=''>
							<Form.Label>Teléfono</Form.Label>
							<PhoneInput
								country='mx'
								enableSearch
								required
								value={item.telefono}
								isValid={(value, country) => {
									value = "+" + value;
									if (
										isValidPhoneNumber(value, country.iso2)
									) {
										setSubmitEnabled(true);
										return true;
									} else {
										setSubmitEnabled(false);
										return false;
									}
								}}
								onChange={(str) => {
									setItem({
										...item,
										telefono: "+" + str,
									});
								}}
							/>
							<Form.Control.Feedback type='invalid'>
								Numero invalido
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<h6>Información de contacto</h6>
				<p>
					<small>
						Ingrese el correo de contacto y dirección de la página
						web.
					</small>
				</p>

				<Row>
					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Correo</Form.Label>
							<Form.Control
								type='email'
								placeholder='Ej. ejemplo@gmail.com'
								onChange={(str) => {
									setItem({
										...item,
										email: str.currentTarget.value,
									});
								}}
								value={item.email}
								required
							/>
						</Form.Group>
					</Col>

					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Página Web</Form.Label>
							<Form.Control
								placeholder='Ej. http://www.ejemplo.com'
								type='url'
								pattern="^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+\.[\w\-_~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										pagina_web: str.currentTarget.value,
									});
								}}
								value={item.pagina_web}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								Url no es válido (http://www.ejemplo.com)
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<h6>Redes Sociales</h6>

				<p>
					<small>
						Ingrese las direcciones a las redes sociales que
						correspondan.
					</small>
				</p>

				<Row>
					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>LinkedIn</Form.Label>
							<Form.Control
								placeholder='Ej. https://www.linkedin.com/company/miempresa/'
								type='url'
								pattern="^(?:http(s)?:\/\/)[w]{3}(?:\.linkedin.com\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										linkedin: str.currentTarget.value,
									});
								}}
								value={item.linkedin}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
							<Form.Control.Feedback type='invalid'>
								Debe ser un url de LinkedIn
								(https://www.linkedin.com/)
							</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Facebook</Form.Label>
							<Form.Control
								placeholder='Ej. https://www.facebook.com/miempresa'
								type='url'
								pattern="^(?:http(s)?:\/\/)[w]{3}(?:\.facebook.com\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										facebook: str.currentTarget.value,
									});
								}}
								value={item.facebook}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
							<Form.Control.Feedback type='invalid'>
								Debe ser un url de Facebook
								(https://www.facebook.com/)
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Instagram</Form.Label>
							<Form.Control
								placeholder='Ej. https://www.instagram.com/miempresa/'
								type='url'
								pattern="^(?:http(s)?:\/\/)[w]{3}(?:\.instagram.com\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										instagram: str.currentTarget.value,
									});
								}}
								value={item.instagram}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
							<Form.Control.Feedback type='invalid'>
								Debe ser un url de Instagram
								(https://www.instagram.com/)
							</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>YouTube</Form.Label>
							<Form.Control
								placeholder='Ej. https://www.youtube.com/miempresa'
								type='url'
								pattern="^(?:http(s)?:\/\/)[w]{3}(?:\.youtube.com\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										youtube: str.currentTarget.value,
									});
								}}
								value={item.youtube}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
							<Form.Control.Feedback type='invalid'>
								Debe ser un url de YouTube
								(https://www.youtube.com/)
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<br />
				<h5>Datos Confidenciales</h5>

				<h6>CEO</h6>
				<p>
					<small>Ingrese los datos del CEO.</small>
				</p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Nombre CEO</Form.Label>
							<Form.Control
								placeholder='Nombre CEO'
								onChange={(str) => {
									setItem({
										...item,
										nombre_ceo: str.currentTarget.value,
									});
								}}
								value={item.nombre_ceo}
								required
							/>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Correo CEO</Form.Label>
							<Form.Control
								placeholder='Correo CEO'
								type='email'
								onChange={(str) => {
									setItem({
										...item,
										email_ceo: str.currentTarget.value,
									});
								}}
								value={item.email_ceo}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Teléfono CEO</Form.Label>
							<PhoneInput
								enableSearch
								required
								value={item.tel_ceo}
								isValid={(value, country) => {
									if (value === "") {
										return true;
									}
									value = "+" + value;
									if (
										isValidPhoneNumber(value, country.iso2)
									) {
										setSubmitEnabled(true);
										return true;
									} else {
										setSubmitEnabled(false);
										return false;
									}
								}}
								onChange={(str) => {
									if (str !== "") {
										str = "+" + str;
									}
									setItem({
										...item,
										tel_ceo: str,
									});
								}}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
							<Form.Control.Feedback type='invalid'>
								Deben ser 10 dígitos
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<h6>CIO</h6>
				<p>
					<small>Ingrese los datos del CIO.</small>
				</p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Nombre CIO</Form.Label>
							<Form.Control
								placeholder='Nombre CIO'
								onChange={(str) => {
									setItem({
										...item,
										nombre_cio: str.currentTarget.value,
									});
								}}
								value={item.nombre_cio}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Correo CIO</Form.Label>
							<Form.Control
								placeholder='Correo CIO'
								onChange={(str) => {
									setItem({
										...item,
										email_cio: str.currentTarget.value,
									});
								}}
								value={item.email_cio}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Teléfono CIO</Form.Label>
							<PhoneInput
								enableSearch
								required
								value={item.tel_cio}
								isValid={(value, country) => {
									if (value === "") {
										return true;
									}
									value = "+" + value;
									if (
										isValidPhoneNumber(value, country.iso2)
									) {
										setSubmitEnabled(true);
										return true;
									} else {
										setSubmitEnabled(false);
										return false;
									}
								}}
								onChange={(str) => {
									if (str !== "") {
										str = "+" + str;
									}
									setItem({
										...item,
										tel_cio: str,
									});
								}}
							/>
							<Form.Text className='text-muted'>
								Opcional
							</Form.Text>
							<Form.Control.Feedback type='invalid'>
								Deben ser 10 dígitos
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<h6>Empresa</h6>
				<p>
					<small>
						Ingrese la razón social y los servicios que proporciona
						su empresa.
					</small>
				</p>

				<Row>
					<Col md={5}>
						<Form.Group controlId=''>
							<Form.Label>Razón Social</Form.Label>
							<Form.Control
								placeholder='Razón Social'
								onChange={(str) => {
									setItem({
										...item,
										razon_social: str.currentTarget.value,
									});
								}}
								value={item.razon_social}
								required
							/>
						</Form.Group>
					</Col>

					<Col md={7}>
						<Form.Group controlId=''>
							<Form.Label>Servicios</Form.Label>
							<Form.Control
								placeholder='Ej. Estrategia de TI, Operaciones de TI...'
								onChange={(str) => {
									setItem({
										...item,
										servicios: str.currentTarget.value,
									});
								}}
								value={item.servicios}
								required
							/>
						</Form.Group>
					</Col>
				</Row>

				<h6>Cantidad de empleados</h6>

				<p>
					<small>
						Seleccione el número aproximado de empleados para cada
						opción.
					</small>
				</p>

				<Row>
					<Col sm={4}>
						<Form.Group controlId=''>
							<Form.Label>En Nuevo León</Form.Label>
							<Form.Control
								// placeholder='# empleados en Nuevo León'
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										num_emp_nl: parseInt(
											str.currentTarget.value
										),
									});
								}}
								required
								value={
									isNaN(item.num_emp_nl)
										? ""
										: item.num_emp_nl
								}
							>
								{getNumEmpleados()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col sm={4}>
						<Form.Group controlId=''>
							<Form.Label>En México</Form.Label>
							<Form.Control
								placeholder='# empleados en México'
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										num_emp_mx: parseInt(
											str.currentTarget.value
										),
									});
								}}
								value={
									isNaN(item.num_emp_mx)
										? ""
										: item.num_emp_mx
								}
								required
							>
								{getNumEmpleados()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col sm={4}>
						<Form.Group controlId=''>
							<Form.Label>Fuera de México</Form.Label>
							<Form.Control
								placeholder='# empleados fuera de México'
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										num_emp_nomx: parseInt(
											str.currentTarget.value
										),
									});
								}}
								value={
									isNaN(item.num_emp_nomx)
										? ""
										: item.num_emp_nomx
								}
								required
							>
								{getNumEmpleados()}
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col sm={6} md={6}>
						<Form.Group controlId=''>
							<Form.Label>En el área de TI</Form.Label>
							<Form.Control
								placeholder='# empleados en TI'
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										num_emp_ti: parseInt(
											str.currentTarget.value
										),
									});
								}}
								required
								value={
									isNaN(item.num_emp_ti)
										? ""
										: item.num_emp_ti
								}
							>
								{getNumEmpleados()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col sm={6} md={6}>
						<Form.Group controlId=''>
							<Form.Label>
								En el área de Administración
							</Form.Label>
							<Form.Control
								placeholder='# empleados en Administración'
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										num_emp_adm: parseInt(
											str.currentTarget.value
										),
									});
								}}
								value={
									isNaN(item.num_emp_adm)
										? ""
										: item.num_emp_adm
								}
								required
							>
								{getNumEmpleados()}
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<h6>Ventas</h6>

				<p>
					<small>
						Seleccione el rango de ventas que mejor corresponda para
						cada opción. La unidadades de ventas están en dólares
						estadounidenses (USD).
					</small>
				</p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Ventas nacionales</Form.Label>
							<Form.Control
								placeholder='Ventas nacionales'
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										ventas_nat: str.currentTarget.value,
									});
								}}
								value={item.ventas_nat}
								required
							>
								{getRangosVentas()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Ventas en el extranjero</Form.Label>
							<Form.Control
								placeholder='Ventas en el extranjero'
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										ventas_ext: str.currentTarget.value,
									});
								}}
								value={item.ventas_ext}
								required
							>
								{getRangosVentas()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Ventas anuales</Form.Label>
							<Form.Control
								placeholder='Ventas anuales'
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										ventas_anuales: str.currentTarget.value,
									});
								}}
								value={item.ventas_anuales}
								required
							>
								{getRangosVentas()}
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<h6>Subsidiarias</h6>
				<p>
					<small>
						Seleccione los países en el que se tiene una subsidiaria
						de la empresa.
					</small>
				</p>

				<Form.Group controlId=''>
					<Form.Label>Países</Form.Label>
					<MultiSelect
						overrideStrings={{
							selectSomeItems: "Selecciona los países",
							allItemsAreSelected: "Todos",
							selectAll: "Todos",
							search: "Buscar",
						}}
						options={countries}
						value={arrayCountries}
						onChange={handleChangeCountries}
						// onChange={(str) => {
						// 	setItem({
						// 		...item,
						// 		paises_exp_princ: str.currentTarget.value,
						// 	});
						// }}
						required
					/>
					<Form.Check>
						<Form.Check.Input
							checked={
								arrayCountries != null &&
								arrayCountries.length > 0
							}
							onChange={() => {}}
							style={{ display: "none" }}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							Seleccionar uno o más paises
						</Form.Control.Feedback>
					</Form.Check>
				</Form.Group>

				<h6>Certificaciones de la empresa</h6>
				<p>
					<small>
						Seleccione la cantidad e ingrese las certificaciones con
						las que cuenta su empresa.
					</small>
				</p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Número de Certificaciones</Form.Label>
							<Form.Control
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										num_cert_empresa: parseInt(
											str.currentTarget.value
										),
									});
								}}
								value={
									isNaN(item.num_cert_empresa)
										? ""
										: item.num_cert_empresa
								}
								required
							>
								{getNumCertificaciones()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col md={8}>
						<Form.Group controlId=''>
							<Form.Label>
								Certificaciones de la empresa
							</Form.Label>
							<MultiSelect
								overrideStrings={{
									selectSomeItems:
										"Selecciona las certificaciones",
									allItemsAreSelected: "Todos",
									selectAll: "Todos",
									search: "Buscar",
								}}
								options={dict_certEmpresas}
								value={certEmpresas}
								onChange={handleSelectCertEmpresas}
								// onChange={(str) => {
								// 	setItem({
								// 		...item,
								// 		paises_exp_princ: str.currentTarget.value,
								// 	});
								// }}
								required
							/>
							{/* <Form.Control
								placeholder='Ej. PMP, CISSP, MCSD, ITIL...'
								onChange={(str) => {
									setItem({
										...item,
										cert_empresa: str.currentTarget.value,
									});
								}}
								value={item.cert_empresa}
								required
							/> */}
							<Form.Check>
								<Form.Check.Input
									checked={certEmpresas.length > 0}
									onChange={() => {}}
									style={{ display: "none" }}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									Seleccionar una o más certificaciones
								</Form.Control.Feedback>
							</Form.Check>
						</Form.Group>
					</Col>
				</Row>

				<h6>Certificaciones de los empleados</h6>
				<p>
					<small>
						Seleccione la cantidad e ingrese las certificaciones con
						las que cuentan sus empleados.
					</small>
				</p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Número de certificaciones</Form.Label>
							<Form.Control
								as='select'
								// defaultValue=''
								onChange={(str) => {
									setItem({
										...item,
										num_cert_empleado: parseInt(
											str.currentTarget.value
										),
									});
								}}
								value={
									isNaN(item.num_cert_empleado)
										? ""
										: item.num_cert_empleado
								}
								required
							>
								{getNumCertificaciones()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col md={8}>
						<Form.Group controlId=''>
							<Form.Label>
								Certificaciones de los empleados
							</Form.Label>
							<MultiSelect
								overrideStrings={{
									selectSomeItems:
										"Selecciona las certificaciones",
									allItemsAreSelected: "Todos",
									selectAll: "Todos",
									search: "Buscar",
								}}
								options={dict_certEmpleado}
								value={certEmpleado}
								onChange={handleSelectCertEmpleado}
								// onChange={(str) => {
								// 	setItem({
								// 		...item,
								// 		paises_exp_princ: str.currentTarget.value,
								// 	});
								// }}
								required
							/>
							<Form.Check>
								<Form.Check.Input
									checked={certEmpleado.length > 0}
									onChange={() => {}}
									style={{ display: "none" }}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									Seleccionar una o más certificaciones
								</Form.Control.Feedback>
							</Form.Check>
						</Form.Group>
					</Col>
				</Row>

				<Button
					id='btn-submitForm'
					className='btn-submit'
					variant='primary'
					type='submit'
					disabled={!submitEnabled}
				>
					Guardar
				</Button>
			</Form>
		</Container>
	);
};

export default FormEmpresa;
