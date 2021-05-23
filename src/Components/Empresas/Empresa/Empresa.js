import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import "./Empresa.css";
import { Link } from "react-router-dom";

const Empresa = (props) => {
	var length = 95;
	var descripcion =
		props.empresa.descripcion.length > length
			? props.empresa.descripcion.substring(0, length - 3) + "..."
			: props.empresa.descripcion;
	return (
		<Col className='container-fluid mt-3' style={{ flexGrow: 0 }}>
			<Card
				style={{ width: "18rem", height: "16rem", margin: "0px auto" }}
			>
				<Card.Header
					style={{
						borderColor: "#f05d29",
						backgroundColor: "#f05d29",
						color: "#ffffff",
					}}
				>
					{props.empresa.nombre_comercial}
				</Card.Header>
				<Card.Body>
					{/* <Card.Title>{props.empresa.nombre_comercial}</Card.Title> */}
					<Card.Subtitle className='mb-2 text-muted'>
						{props.empresa.flexGrowgiro}
					</Card.Subtitle>
					<Card.Text>{descripcion}</Card.Text>
					<Card.Text>{props.empresa.email}</Card.Text>
					<Button
						className='btn-vermas'
						onClick={() => {
							props.setEmpresa(props.empresa);
						}}
						as={Link}
						to={"/empresa/" + props.empresa.id}
					>
						Ver más
					</Button>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Empresa;
