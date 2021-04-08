import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import "./Empresa.css";


const Empresa = (props) => {
	return 	<Col className="container-fluid mt-3">
				<Card style={{ width: '18rem', height: "16rem" }}>
					<Card.Body>
						<Card.Title>{props.empresa.nombre_comercial}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{props.empresa.giro}</Card.Subtitle>
						<Card.Text>
							{props.empresa.descripcion}
						</Card.Text>
						<Card.Text>
							{props.empresa.email}
						</Card.Text>
						<Button className="btn-vermas">Ver más</Button>
					</Card.Body>
				</Card>
			</Col>;
};

export default Empresa;
