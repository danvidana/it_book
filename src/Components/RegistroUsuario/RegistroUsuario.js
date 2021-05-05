import React, { useContext, useRef } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Button, Row, Col } from "react-bootstrap";
// import mty from "../../images/mty.jpg";y
import "./RegistroUsuario.css";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useHistory } from "react-router";

// Componente del formulario para dar de alta una empresa

const RegistroUsuario = () => {
	const firebase = useContext(FirebaseContext);
	const emailRef = useRef();
	const passwordRef = useRef();
	const confPswdRef = useRef();
	const { fetchCurrentUser } = useContext(CurrentUserContext);
	const history = useHistory();

	const submitChanges = async (event) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const conf_pswd = confPswdRef.current.value;
		let message = "Se ha registrado exitosamente!";
		if (password !== conf_pswd) {
			message = "Las contraseñas no son iguales!";
			window.alert(message);
		} else {
			try {
				firebase
					.createNewUser(email, password)
					.then(() => {
						firebase
							.signInWithUserAndPassword(email, password)
							.then(() => {
								fetchCurrentUser();
							})
							.catch(() => {
								message = "Ocurrio un error al iniciar sesión";
							})
							.finally(() => {
								history.push("/");
								window.alert(message);
							});
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
		}
	};

	return (
		<div id='registro' className='justify-content-center'>
			<Row id='row-registro'>
				<Col sm={2} md={3}></Col>
				<Col sm={8} md={6} id='col-registro'>
					<div id='cajaRegistro'>
						<h3 style={{ paddingTop: "10px" }}>Registro</h3>
						<Form id='registroForm' onSubmit={submitChanges}>
							<Form.Group controlId=''>
								<Form.Label>Correo:</Form.Label>
								<Form.Control
									className='formControl'
									placeholder='Correo'
									ref={emailRef}
								/>
							</Form.Group>

							<Form.Group controlId=''>
								<Form.Label>Contraseña:</Form.Label>
								<Form.Control
									className='formControl'
									placeholder='Contraseña'
									type='password'
									ref={passwordRef}
								/>
							</Form.Group>

							<Form.Group controlId=''>
								<Form.Label>Confirmar Contraseña:</Form.Label>
								<Form.Control
									className='formControl'
									placeholder='Confirmar Contraseña'
									type='password'
									ref={confPswdRef}
								/>
							</Form.Group>

							<Button
								id='btn-nuevoUsuario'
								className='btn-submit'
								variant='primary'
								type='submit'
							>
								Guardar
							</Button>
						</Form>
					</div>
				</Col>
				
				<Col sm={2} md={3}></Col>
				{/* <Col sm={7} md={7} id='col-registro-image'>
					<img id='mty-image' src={mty} alt='monterrey' />
				</Col> */}
			</Row>
		</div>
	);
};

export default RegistroUsuario;
