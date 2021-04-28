import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { CurrentUserContext } from "../../CurrentUserContext";

// Componente del formulario para dar de alta una empresa

const Login = () => {
	const firebase = useContext(FirebaseContext);
	const { fetchCurrentUser } = useContext(CurrentUserContext);
	const history = useHistory();
	const [item, setItem] = useState({
		email: "",
		password: "",
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

	return (
		<Form onSubmit={submitChanges}>
			<h5>Registro</h5>

			<Form.Group controlId=''>
				<Form.Label>Email</Form.Label>
				<Form.Control
					placeholder='email'
					onChange={(str) => {
						setItem({
							...item,
							email: str.currentTarget.value,
						});
					}}
				/>
				<Form.Label>Contraseña</Form.Label>
				<Form.Control
					placeholder='password'
					onChange={(str) => {
						setItem({
							...item,
							password: str.currentTarget.value,
						});
					}}
					type='password'
				/>
			</Form.Group>

			<Button className='btn-submitForm' variant='primary' type='submit'>
				Registrarse
			</Button>
		</Form>
	);
};

export default Login;
