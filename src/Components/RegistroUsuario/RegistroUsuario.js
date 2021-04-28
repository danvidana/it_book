import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Button, Row, Col } from "react-bootstrap";
import mty from "../../images/mty.jpg"
import "./RegistroUsuario.css";

// Componente del formulario para dar de alta una empresa

const RegistroUsuario = () => {
	const firebase = useContext(FirebaseContext);
	const [item, setItem] = useState({
		correo: "",
		contraseña: ""
	});
	const [conf_pswd, setConf_pswd] = useState ({
		conf_pswd : ""
	})

	const submitChanges = async (event) => {
		event.preventDefault();
		let message = "Su cuenta ha sido creada";
		try {
			const copy = item;
			// await firebase.addEmpresa(copy);
			console.log(copy);
			console.log(conf_pswd.conf_pswd)
		} catch (e) {
			console.log(e);
			message =
				"Ha ocurrido un error, revise que toda la información sea correcta,\nY que tiene buena conexión de internet.";
		}
		window.alert(message);
	};

	return (
		<div id="registro"
		className="justify-content-center"
		>
			<Row id="row-registro">
                <Col sm={5} md={5} id="col-registro">
					<div id="cajaRegistro">
						<h3 style={{paddingTop:"10px"}}>Registro</h3>
						<Form 
						id="registroForm"
						onSubmit={submitChanges}
						>

							<Form.Group controlId=''>
								<Form.Label>Correo:</Form.Label>
								<Form.Control
									className="formControl"
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
									className="formControl"
									placeholder='Contraseña'
									type="password"
									onChange={(str) => {
										setItem({
											...item,
											contraseña: str.currentTarget.value,
										});
									}}
								/>
							</Form.Group>

							<Form.Group controlId=''>
								<Form.Label>Confirmar Contraseña:</Form.Label>
								<Form.Control
									className="formControl"
									placeholder='Confirmar Contraseña'
									type="password"
									onChange={(str) => {
										setConf_pswd({
											...conf_pswd,
											conf_pswd: str.currentTarget.value,
										});
									}}
								/>
							</Form.Group>

							<Button id="btn-nuevoUsuario" className='btn-submit' variant='primary' type='submit'>
								Guardar
							</Button>
						</Form>
					</div>
				</Col>

				<Col sm={7} md={7} id="col-registro-image">
                    <img id="mty-image" src={mty} alt="monterrey" />
                </Col>
			</Row>
			
		</div>

	);
};

export default RegistroUsuario;
