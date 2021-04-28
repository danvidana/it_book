import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Button, Row, Col } from "react-bootstrap";
import mty from "../../images/mty.jpg";
import "./RegistroUsuario.css";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useHistory } from "react-router";

// Componente del formulario para dar de alta una empresa

const RegistroUsuario = () => {
	const firebase = useContext(FirebaseContext);
	const [item, setItem] = useState({
		correo: "",
		password: "",
		conf_pswd: "",
	});
	const { fetchCurrentUser } = useContext(CurrentUserContext);
	const history = useHistory();

	const submitChanges = async (event) => {
		event.preventDefault();
		let message = "Se ha registrado exitosamente!";
		if (item.password !== item.conf_pswd) {
			message = "Las contraseñas no son iguales!";
			window.alert(message);
		} else {
			try {
				firebase
					.createNewUser(item.correo, item.password)
					.then((cred) => {
						firebase.signInWithUserAndPassword(
							item.correo,
							item.password
						);
						fetchCurrentUser();
						history.push("/");
						console.log(cred);
						window.alert(message);
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
				<Col sm={5} md={5} id='col-registro'>
					<div id='cajaRegistro'>
						<h3 style={{ paddingTop: "10px" }}>Registro</h3>
						<Form id='registroForm' onSubmit={submitChanges}>
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
											password: str.currentTarget.value,
										});
									}}
								/>
							</Form.Group>

							<Form.Group controlId=''>
								<Form.Label>Confirmar Contraseña:</Form.Label>
								<Form.Control
									className='formControl'
									placeholder='Confirmar Contraseña'
									type='password'
									onChange={(str) => {
										setItem({
											...item,
											conf_pswd: str.currentTarget.value,
										});
									}}
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

				<Col sm={7} md={7} id='col-registro-image'>
					<img id='mty-image' src={mty} alt='monterrey' />
				</Col>
			</Row>
		</div>
	);
};

export default RegistroUsuario;
