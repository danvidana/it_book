import React, { useContext, useEffect, useState, Fragment } from "react";
import { CardDeck, Container, Row } from "react-bootstrap";
import { FirebaseContext } from "../../API/index";
import Empresa from "../Empresas/Empresa/Empresa";
import { Card, Button, Col } from "react-bootstrap";
import businessImg from '../../images/detalleEmpresa_business.jpg'
import "./DetalleEmpresa.css";


const DetalleEmpresa = (props) => {
	const firebase = useContext(FirebaseContext);
    let datosEmpresa;


    /*
    useEffect(() => {
		firebase.getEmpresasByName(props.nombreEmpresa).then((result) => {
			datosEmpresa = result[0];
            //console.log(datosEmpresa);
			//setEmpresa(datosEmpresa);
            console.log(datosEmpresa);
		});
	}, [firebase,props.nombreEmpresa]);
    */
	
	return 	<Container>
        <Row>
            <Col>
                <img className="imgBorder my-3" style={{width:"100%"}} src={businessImg} alt="Logo de Empresa" />
            </Col>
            <Col>
            </Col>
            
        </Row>
        <Row>
            <Col className="text-left h1">
                {props.datosEmpresa.nombre_comercial}
            </Col>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col className="text-left h2" style={{color:"#f05d29"}}>
                {props.datosEmpresa.giro}
            </Col>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col className="text-left h2">
                {props.datosEmpresa.pagina_web}
            </Col>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col className="text-left mb-2">
                {props.datosEmpresa.descripcion}
            </Col>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col className="text-left h3">
                {props.datosEmpresa.email}
            </Col>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col className="text-left h3">
                Teléfono - {props.datosEmpresa.telefono}
            </Col>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col className="text-left">
                
            </Col>
            <Col>
            </Col>
        </Row>
        
        

    </Container>
};

export default DetalleEmpresa;