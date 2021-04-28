import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../API/index";
import { Form, Button, Row, Col } from "react-bootstrap";
import mty from "../../images/mty.jpg";
import "./Login.css";

// Componente del formulario para dar de alta una empresa

const Login = () => {
	const firebase = useContext(FirebaseContext);
	const { fetchCurrentUser } = useContext(CurrentUserContext);
	const history = useHistory();
	const [item, setItem] = useState({
		correo: "",
		contraseña: "",
	});

	const submitChanges = async (event) => {
		event.preventDefault();
		let message = "";
		try {
			firebase
				.signInWithUserAndPassword(item.email, item.password)
				.then((user) => {
					history.push("/");
					fetchCurrentUser();
				})
				.catch((error) => {
					console.log(error);
					switch (error.code) {
						case "auth/email-already-in-use":
							message = "Este correo ya esta existe!";
							break;
						case "auth/invalid-email":
							message = "El correo ingresado es invalido";
							break;
						case "auth/weak-password":
							message =
								"La contraseña debe tener minimo 6 caracteres";
							break;
						default:
							message =
								"Ha ocurrido un error, intentelo de nuevo";
							break;
					}
					window.alert(message);
				});
		} catch (error) {
			message = "Algo salió mal, intentelo de nuevo.";
			window.alert(message);
		}
	};

	// return (
	// 	<Form onSubmit={submitChanges}>
	// 		<h5>Registro</h5>

	// 		<Form.Group controlId=''>
	// 			<Form.Label>Email</Form.Label>
	// 			<Form.Control
	// 				placeholder='email'
	// 				onChange={(str) => {
	// 					setItem({
	// 						...item,
	// 						email: str.currentTarget.value,
	// 					});
	// 				}}
	// 			/>
	// 			<Form.Label>Contraseña</Form.Label>
	// 			<Form.Control
	// 				placeholder='password'
	// 				onChange={(str) => {
	// 					setItem({
	// 						...item,
	// 						password: str.currentTarget.value,
	// 					});
	// 				}}
	// 				type='password'
	// 			/>
	// 		</Form.Group>

	// 		<Button className='btn-submitForm' variant='primary' type='submit'>
	// 			Registrarse
	// 		</Button>
	// 	</Form>
	// 	let message = "Su cuenta ha sido creada";
	// 	try {
	// 		const copy = item;
	// 		// await firebase.addEmpresa(copy);
	// 		console.log(copy);
	// 	} catch (e) {
	// 		console.log(e);
	// 		message =
	// 			"Ha ocurrido un error, revise que toda la información sea correcta,\nY que tiene buena conexión de internet.";
	// 	}
	// 	window.alert(message);
	// };
	return (
		<div id='login' className='justify-content-center'>
			<Row id='row-login'>
				<Col sm={5} md={5} id='col-login'>
					<div id='cajaLogin'>
						<h3 style={{ paddingTop: "10px" }}>Iniciar Sesión</h3>
						<Form id='loginForm' onSubmit={submitChanges}>
							<Form.Group controlId=''>
								<Form.Label>Correo:</Form.Label>
								<Form.Control
									className='formControl'
									placeholder='Correo'
									onChange={(str) => {
										setItem({
											...item,
											correo: str.currentTarget.value,
										});
									}}
								/>
							</Form.Group>

							<Form.Group controlId=''>
								<Form.Label>Contraseña:</Form.Label>
								<Form.Control
									className='formControl'
									placeholder='Contraseña'
									type='password'
									onChange={(str) => {
										setItem({
											...item,
											contraseña: str.currentTarget.value,
										});
									}}
								/>
							</Form.Group>

							<Row>
								<Col
									sm={8}
									style={{
										textAlign: "right",
										paddingBottom: "10px",
									}}
								>
									<Link to='/registrar-usuario'>
										Crear cuenta
									</Link>
								</Col>
								<Col sm={4}>
									<Button
										id='btn-Login'
										className='btn-submit'
										variant='primary'
										type='submit'
									>
										Iniciar Sesión
									</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</Col>

				<Col sm={7} md={7} id='col-login-image'>
					<img id='mty-image' src={mty} alt='monterrey' />
				</Col>
			</Row>
		</div>
	);
};

export default Login;
