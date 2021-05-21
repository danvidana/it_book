import  React from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import "./SearchBar.css";

// Componente del formulario para busquar una empresa

const SearchBar = (props) => {

	const list_giros = [
		"Desarrollo Web",
		"Soluciones Tecnológicas",
		"Fintech",
		"Healthtech",
		"E-commerce",
		"Desarrollo a la medida",
		"Facturación electrónica",
		"Staffing",
		"Software as a service",
		"Monitoreo de SW & HW",
		"Consultoría TIC",
		"Asesoría en propiedad intelectual en temas de tecnología",
		"Tratamiento de imagen",
		"Servicios de Telecomuicaciones",
		"Streaming y desarrollo de eventos virtuales",
		"Uso de PLC", 
		"Redes industriales",
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

	const getGiros = function () {
		return [
			<option value='' key={0}>
				Todos los Giros
			</option>
		].concat(
			list_giros.map((val, index) => {
				return (
					<option key={index + 1} value={val}>
						{val}
					</option>
				);
			})
		);
	};

	return (
		<div id='searchbox' className='justify-content-center'>
			{/* <h3 style={{ paddingTop: "10px" }}>Registro</h3> */}
			<Row id='search-row'>
				<Col id='search-col'>
					<Form
						id='search-from'
						onSubmit={(event) => {
							event.preventDefault();
						}}
					>
						<Form.Group id='search-group'>
                            <Container style={{ width: "95%" }}>
                                <Row id='searchform-row'>
                                    <Col sm={8} md={7} lg={6} id='search-control'>
                                            <Form.Control
                                                placeholder='Ingresa una empresa'
                                                onChange={(str) =>
                                                    props.setName(str.target.value)
                                                }
                                            />
                                        <br />
                                    </Col>
									<Col sm={4} md={4} lg={3}>
										{/* <Button id="search-giro">Giro</Button> */}
										<Form.Control
											id='select-giro'
											as='select'
											value={props.giro}
											onChange={(e) => {
												props.setGiro(e.currentTarget.value);
											}}
										>
											{getGiros()}
										</Form.Control>
									</Col>
                                </Row>
                            </Container>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default SearchBar;
