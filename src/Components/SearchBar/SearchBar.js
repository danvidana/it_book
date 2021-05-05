import React from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import "./SearchBar.css";

// Componente del formulario para busquar una empresa

const SearchBar = (props) => {
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
							<Row id='searchform-row'>
								<Col sm={8} md={7} lg={6} id='search-control'>
									<Container style={{ width: "95%" }}>
										<Form.Control
											placeholder='Ingresa una empresa'
											onChange={(str) =>
												props.setName(str.target.value)
											}
										/>
									</Container>
									<br />
								</Col>
							</Row>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default SearchBar;
