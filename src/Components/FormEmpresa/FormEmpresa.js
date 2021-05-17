import React, { useContext, useState, useMemo } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { CurrentUserContext } from "../../CurrentUserContext";
import "./FormEmpresa.css";
import { useHistory } from "react-router";
import MultiSelect from "react-multi-select-component";

// Componente del formulario para dar de alta una empresa

const FormEmpresa = (props) => {
	const firebase = useContext(FirebaseContext);
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
		telefono: 0,
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
		num_emp_nl: 0,
		num_emp_mx: 0,
		num_emp_nomx: 0,
		num_emp_ti: 0,
		num_emp_adm: 0,
		ventas_nat: "",
		ventas_ext: "",
		ventas_anuales: "",
		paises_exp_princ: [],
		num_cert_empresa: 0,
		cert_empresa: "",
		num_cert_empleado: 0,
		cert_empleado: ""
	});

	// diccionario de todas las opciones de giros por area
	const dict_giros = [
		{
			"area": "Desarrollo de Software",
			"giros": [
				"Desarrollo Web", 
				"Soluciones Tecnológicas",
				"Fintech", 
				"Healthtech", 
				"E-commerce", 
				"Desarrollo a la medida"
			]
		},
		{
			"area": "Servicios",
			"giros": [
				"Facturación electrónica", 
				"Staffing", 
				"Software as a service", 
				"Monitoreo de SW & HW", 
				"Consultoría TIC", 
				"Asesoría en propiedad intelectual en temas de tecnología", 
				"Tratamiento de imagen", 
				"Servicios de Telecomuicaciones", 
				"Streaming y desarrollo de eventos virtuales"
			]
		},
		{
			"area": "Hardware",
			"giros": [
				"Uso de PLC", 
				"Redes industriales"
			]
		},
		{
			"area": "Tecnología 4.0",
			"giros": [
				"3D Printing", 
				"Business Intelligence", 
				"Big data y Analítica de datos", 
				"Inteligencia artificial", 
				"Robótica", 
				"IoT", 
				"Ciberseguridad", 
				"Blockchain", 
				"Nube"
			]
		}
	]

	const dict_num_empleados = [
		{ "value" : 0 },
		{ "value" : 1 },
		{ "value" : 5 },
		{ "value" : 10 },
		{ "value" : 30 },
		{ "value" : 50 },
		{ "value" : 100 },
		{ "value" : 150 },
		{ "value" : 200 },
		{ "value" : 250 },
		{ "value" : 350 },
		{ "value" : 500 },
		{ "value" : 700 },
		{ "value" : 850 },
		{ "value" : 1000 },
		{ "value" : 5000 },
		{ "value" : 10000 },
		{ "value" : 20000 },
		{ "value" : 30000 },
		{ "value" : 50000 },
		{ "value" : 70000 }
	]

	const dict_rangos_ventas = [
		{ "value" : "Menor a $500,000" },
		{ "value" : "$500,000 a $1,000,000" },
		{ "value" : "$1,000,000 - $2,000,000" },
		{ "value" : "$2,000,000 - $5,000,000" },
		{ "value" : "$5,000,000 - $10,000,000" },
		{ "value" : "$10,000,000 - $50,000,000" },
		{ "value" : "Mayor a $50,000,000" }
	]

	const dict_num_certificaciones = [
		{ "value" : 0 },
		{ "value" : 1 },
		{ "value" : 2 },
		{ "value" : 3 },
		{ "value" : 4 },
		{ "value" : 5 },
		{ "value" : 10 },
		{ "value" : 30 },
		{ "value" : 50 }
	]

	const [validated, setValidated] = useState(false);
	const { currentUser, fetchCurrentUser } =
		React.useContext(CurrentUserContext);
	const history = useHistory();

	// Area
	const [area, setArea] = useState({"index": -1})
	const [selectvalue, setSelectvalue] = useState("")

	// regresa las opciones areas
	const getAreas = function () {

		return [
			<option value="" key="0" disabled>Selecciona una opción</option>
			].concat(Object.entries(dict_giros).map(function([index, key]) {
				return <option key={index + 1} value={index}>{key["area"]}</option>;
			}))
	}

	// regresa las opciones de giros
	// se debe seleccionar un area primero
	const getGiros = function () {
		if (area["index"] === -1) {
			return <option key="" value="">Selecciona una opción</option>
		}
		return dict_giros[area["index"]]["giros"].map((value, i) => {
			return <option key={i} value={value}>{value}</option>
		})
	}

	// Guarda el indice de dict_giros donde se encuentra el area seleccionada
	// guarda el primer elemento de los giros
	const updateArea = (e) => {
		let index = e.target.value
		// area
		let select_area = dict_giros[index]["area"]
		// primer giro del area
		let giro_0 = dict_giros[index]["giros"][0]

		// console.log(select_area)
		
		setArea({index});
		setSelectvalue(giro_0)

		setItem({
			...item,
			area: select_area,
			giro: giro_0
		});
	}

	
	// lista de paises
	const searchURL = 'https://restcountries.eu/rest/v2/all';

	const [arrayCountries, setArrayCountries] = useState([])
	var dict_countries = [];

	async function getCountries() {
		const url = searchURL;
		const response = await fetch(url);
		const responseData = await response.json();

		// console.log(responseData);

		 // create an empty array
		Object.entries(responseData).map(function([index, key]) {
			if(key["translations"]["es"] !== null){
				dict_countries.push({
					"label": key["translations"]["es"],
					"value": key["translations"]["es"]
				});
			} else {
				dict_countries.push({
					"label": key["name"],
					"value": key["name"]
				});
			}
			
		})
		// console.log(dict_countries)
		// return dict_countries
	}

	getCountries()

	const options = useMemo(() => dict_countries, [])

	// guarda en un arreglo los países seleccionados
	const handleChangeCountries = (selectedOptions) => {
		setArrayCountries(selectedOptions)
		setItem({
			...item,
			paises_exp_princ: selectedOptions
		});
	}

	// Imagen logo
	const [image, setImage] = useState(null);

	// Sube la imagen a firebase
	function handleImageUpload() {
		var storage = firebase.storage;
		const uploadTask = storage.ref(`/images/${image.name}`).put(image);
		uploadTask.on(
			"state_changed", console.log, console.error, 
			() => {
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
					// setImage(null);
					setItem({
						...item,
						logo: url
					});
					});
			}
		);
	}
	
	const handleImageChange = (e) =>  {
		let img = e.target.files[0]
		setImage(img);
		// console.log(img)
		handleImageUpload()
	}

	// regresa las opciones de numeros de empleados
	const getNumEmpleados = function () {
		return [
			<option value="" key="0" disabled>Selecciona una opción</option>
		  ].concat(Object.entries(dict_num_empleados).map(function([index, key]) {
			return <option key={index + 1} value={key["value"]}>{key["value"]}</option>;
		  })
		)
	}

	// regresa los rangos de ventas
	const getRangosVentas = function () {
		return [
			<option value="" key="0" disabled>Selecciona una opción</option>
		  ].concat(Object.entries(dict_rangos_ventas).map(function([index, key]) {
				return <option key={index + 1} value={key["value"]}>{key["value"]}</option>;
			})
		  )
		
	}

	// regresa los numeros de certificaciones
	const getNumCertificaciones = function () {
		return [
			<option value="" key="0" disabled>Selecciona una opción</option>
		  ].concat(Object.entries(dict_num_certificaciones).map(function([index, key]) {
				return <option key={index + 1} value={key["value"]}>{key["value"]}</option>;
			})
		  )
		
	}

	if (currentUser === null || currentUser === undefined) {
		history.push("/");
	} else if (currentUser.userData.hasEmpresa) {
		history.push("/");
	}

	// función para subir cambios a la base de datos
	const submitChanges = async (event) => {
		event.preventDefault();
		let message = "Se ha subido la empresa";
		const form = event.currentTarget;


		console.log(item.logo)

		try {
			// Verifica que ningún campo esté vacío
			if (form.checkValidity() === false) {
				console.log(form.checkValidity());
				message = "Campos sin responder";
				event.stopPropagation();
			} else {
				// Añade la empresa a la base de datos
				const copy = item;
				firebase.addEmpresa(copy).then((empresa) => {
					firebase.setHasEmpresa(currentUser.uid, true, empresa.id);
					fetchCurrentUser();
					history.push("/");
				});
				console.log(copy);
			
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
				<p><small>Ingrese los datos universales de la empresa.</small></p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Nombre Comercial</Form.Label>
							<Form.Control
								placeholder='Nombre Comercial'
								onChange={(str) => {
									setItem({
										...item,
										nombre_comercial: str.currentTarget.value,
									});
								}}
								required
							/>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Área</Form.Label>
							<Form.Control
								as="select"
								defaultValue=""
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
								as="select"
								value={selectvalue}
								onChange={(e) => {
									setSelectvalue(e.currentTarget.value)
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
						required
					/>
				</Form.Group>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Logo</Form.Label>
							<Form.File 
								accept="image/*"
								label={image ? image.name : "Seleccionar imagen" }
								onChange={handleImageChange}
								custom
								required
							>
							</Form.File>
						</Form.Group>
					</Col>
				</Row>

				<h6>Dirección</h6>
				<p><small>Ingrese los datos de ubicación.</small></p>

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
								required
							/>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col sm={4}>
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
								required
							/>
						</Form.Group>
					</Col>

					<Col sm={4}>
						<Form.Group controlId=''>
							<Form.Label>Código Postal</Form.Label>
							<Form.Control
								placeholder='Código Postal'
								type="text"
								pattern="[0-9]{5}"
								onChange={(str) => {
									setItem({
										...item,
										cp: parseInt(str.currentTarget.value),
									});
								}}
								required
							/>
							<Form.Control.Feedback type="invalid" >Deben ser 5 dígitos</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col sm={4}>
						<Form.Group controlId=''>
							<Form.Label>Teléfono</Form.Label>
							<Form.Control
								placeholder='Teléfono'
								type="text"
								pattern="[0-9]{10}"
								onChange={(str) => {
									setItem({
										...item,
										telefono: parseInt(str.currentTarget.value),
									});
								}}
								required
							/>
							<Form.Control.Feedback type="invalid" >Deben ser 10 dígitos</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<h6>Información de contacto</h6>
				<p><small>Ingrese el correo de contacto y dirección de la página web.</small></p>

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
								required
							/>
						</Form.Group>
					</Col>

					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Página Web</Form.Label>
							<Form.Control
								placeholder='Ej. http://www.ejemplo.com'
								type="url"
								pattern="^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+\.[\w\-_~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										pagina_web: str.currentTarget.value,
									});
								}}
								required
							/>
							<Form.Control.Feedback type="invalid" >Url no es válido</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>
				
				<br/>
				<h5>Datos Confidenciales</h5>

				<h6>CEO</h6>
				<p><small>Ingrese los datos del CEO.</small></p>

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
								required
							/>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Correo CEO</Form.Label>
							<Form.Control
								placeholder='Correo CEO'
								type="email"
								onChange={(str) => {
									setItem({
										...item,
										email_ceo: str.currentTarget.value,
									});
								}}
								required
							/>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Teléfono CEO</Form.Label>
							<Form.Control
								placeholder='Teléfono CEO'
								type="text"
								pattern="[0-9]{10}"
								onChange={(str) => {
									setItem({
										...item,
										tel_ceo: parseInt(str.currentTarget.value),
									});
								}}
							/>
							<Form.Text className="text-muted">
								Opcional
							</Form.Text>
							<Form.Control.Feedback type="invalid" >Deben ser 10 dígitos</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<h6>CIO</h6>
				<p><small>Ingrese los datos del CIO.</small></p>

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
								required
							/>
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
								required
							/>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Teléfono CIO</Form.Label>
							<Form.Control
								placeholder='Teléfono CIO'
								type="text"
								pattern="[0-9]{10}"
								onChange={(str) => {
									setItem({
										...item,
										tel_cio: parseInt(str.currentTarget.value),
									});
								}}
							/>
							<Form.Text className="text-muted">
								Opcional
							</Form.Text>
							<Form.Control.Feedback type="invalid" >Deben ser 10 dígitos</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>
				

				<h6>Empresa</h6>
				<p><small>Ingrese la razón social y los servicios que proporciona su empresa.</small></p>

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
								required
							/>
						</Form.Group>
					</Col>
				</Row>

				<h6>Redes Sociales</h6>

				<p><small>Ingrese las direcciones a las redes sociales que correspondan.</small></p>

				{/* <Form.Group controlId=''>
					<Form.Label>Redes Sociales</Form.Label>
					<Form.Control
						placeholder='Redes Sociales'
						onChange={(str) => {
							setItem({
								...item,
								redes_sociales: str.currentTarget.value,
							});
						}}
						required
					/>
				</Form.Group> */}

				<Row>
					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>LinkedIn</Form.Label>
							<Form.Control
								placeholder='Ej. https://www.linkedin.com/company/miempresa/'
								type="url"
								pattern="^(?:http(s)?:\/\/)[w]{3}(?:\.linkedin.com\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										linkedin: str.currentTarget.value,
									});
								}}
							/>
							<Form.Text className="text-muted">
								Opcional
							</Form.Text>
							<Form.Control.Feedback type="invalid" >Debe ser un url de LinkedIn</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Facebook</Form.Label>
							<Form.Control
								placeholder='Ej. https://www.facebook.com/miempresa'
								type="url"
								pattern="^(?:http(s)?:\/\/)[w]{3}(?:\.facebook.com\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										facebook: str.currentTarget.value,
									});
								}}
							/>
							<Form.Text className="text-muted">
								Opcional
							</Form.Text>
							<Form.Control.Feedback type="invalid" >Debe ser un url de Facebook</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>Instagram</Form.Label>
							<Form.Control
								placeholder='Ej. https://www.instagram.com/miempresa/'
								type="url"
								pattern="^(?:http(s)?:\/\/)[w]{3}(?:\.instagram.com\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										instagram: str.currentTarget.value,
									});
								}}
							/>
							<Form.Text className="text-muted">
								Opcional
							</Form.Text>
							<Form.Control.Feedback type="invalid" >Debe ser un url de Instagram</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col sm={6}>
						<Form.Group controlId=''>
							<Form.Label>YouTube</Form.Label>
							<Form.Control
								placeholder='Ej. https://www.youtube.com/miempresa'
								type="url"
								pattern="^(?:http(s)?:\/\/)[w]{3}(?:\.youtube.com\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
								onChange={(str) => {
									setItem({
										...item,
										youtube: str.currentTarget.value,
									});
								}}
							/>
							<Form.Text className="text-muted">
								Opcional
							</Form.Text>
							<Form.Control.Feedback type="invalid" >Debe ser de YouTube</Form.Control.Feedback>
						</Form.Group>
					</Col>
				</Row>

				<h6>Cantidad de empleados</h6>

				<p><small>Seleccione el número aproximado de empleados para cada opción.</small></p>

				<Row>
					<Col sm={4}>
						<Form.Group controlId=''>
							<Form.Label>En Nuevo León</Form.Label>
							<Form.Control
								// placeholder='# empleados en Nuevo León'
								as='select'
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										num_emp_nl: parseInt(str.currentTarget.value),
									});
								}}
								required
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
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										num_emp_mx: parseInt(str.currentTarget.value),
									});
								}}
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
								as="select"
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										num_emp_nomx: parseInt(str.currentTarget.value),
									});
								}}
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
								as="select"
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										num_emp_ti: parseInt(str.currentTarget.value),
									});
								}}
								required
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
								as="select"
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										num_emp_adm: parseInt(str.currentTarget.value),
									});
								}}
								required
							>
								{getNumEmpleados()}
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<h6>Ventas</h6>

				<p><small>Seleccione el rango de ventas que mejor corresponda para cada opción.</small></p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>Ventas nacionales</Form.Label>
							<Form.Control
								placeholder='Ventas nacionales'
								as="select"
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										ventas_nat: str.currentTarget.value,
									});
								}}
								required
							>
								{getRangosVentas()}
							</Form.Control>
						</Form.Group>
					</Col>

					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>
								Ventas en el extranjero
							</Form.Label>
							<Form.Control
								placeholder='Ventas en el extranjero'
								as="select"
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										porcentaje_ventas_ext: str.currentTarget.value,
									});
								}}
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
								as="select"
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										ventas_anuales: str.currentTarget.value
									});
								}}
								required
							>
								{getRangosVentas()}
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<h6>Subsidiarias</h6>
				<p><small>Seleccione los países en el que se tiene una subsidiaria de la empresa.</small></p>

				<Form.Group controlId=''>
					<Form.Label>
					Países
					</Form.Label>
					<MultiSelect
						overrideStrings={{
							selectSomeItems: "Selecciona los países",
							allItemsAreSelected: "Todos",
							selectAll: "Todos",
							search: "Buscar",
						}}
						options={options}
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
							checked={arrayCountries != null && arrayCountries.length > 0}
							style={{display:'none' }}
							required
						/>
						<Form.Control.Feedback type="invalid" >Seleccionar uno o más paises</Form.Control.Feedback>
					</Form.Check>
				</Form.Group>

				<h6>Certificaciones de la empresa</h6>
				<p><small>Seleccione la cantidad e ingrese las certificaciones con las que cuenta su empresa.</small></p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>
								Número de Certificaciones
							</Form.Label>
							<Form.Control
								as="select"
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										num_cert_empresas: parseInt(str.currentTarget.value),
									});
								}}
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
							<Form.Control
								placeholder='Ej. PMP, CISSP, MCSD, ITIL...'
								
								onChange={(str) => {
									setItem({
										...item,
										cert_empresa: str.currentTarget.value,
									});
								}}
								required
							/>
						</Form.Group>
					</Col>
				</Row>

				<h6>Certificaciones de los empleados</h6>
				<p><small>Seleccione la cantidad e ingrese las certificaciones con las que cuentan sus empleados.</small></p>

				<Row>
					<Col md={4}>
						<Form.Group controlId=''>
							<Form.Label>
								Número de certificaciones
							</Form.Label>
							<Form.Control
								as="select"
								defaultValue=""
								onChange={(str) => {
									setItem({
										...item,
										num_cert_empleados: parseInt(str.currentTarget.value),
									});
								}}
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
							<Form.Control
								placeholder='Ej. FITSP, CompTIA A+ Essentials...'
								onChange={(str) => {
									setItem({
										...item,
										cert_empleado: str.currentTarget.value,
									});
								}}
								required
							/>
						</Form.Group>
					</Col>
				</Row>

				

				{/* <Form.Group controlId=''>
					<Form.Label>
						Número de certificaciones con las que cuentan sus
						empleados
					</Form.Label>
					<Form.Control
						placeholder='Número de certificaciones con las que cuentan sus empleados'
						onChange={(str) => {
							setItem({
								...item,
								num_cert_emp: parseInt(str.currentTarget.value),
							});
						}}
						required
					/>
				</Form.Group> */}

				<Button
					id='btn-submitForm'
					className='btn-submit'
					variant='primary'
					type='submit'
				>
					Guardar
				</Button>
			</Form>
		</Container>
	);
};

export default FormEmpresa;
