import React from "react";
import { Card } from "react-bootstrap";

const Empresa = (props) => {
	return (
		<Card>
			<Card.Body>
				<Card.Title>{props.nombre}</Card.Title>
				<Card.Text>
					This is a wider card with supporting text below as a natural
					lead-in to additional content. This content is a little bit
					longer.
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Empresa;
