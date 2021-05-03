import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Row, Col, Container, Dropdown} from "react-bootstrap";
import "./SearchBar.css";

// Componente del formulario para busquar una empresa

const SearchBar = (props) => {
	const firebase = useContext(FirebaseContext);

    // const handleSelect=(e)=>{
    //     console.log(e);
    // }

	return (
		<div id='searchbox' className='justify-content-center'>
            {/* <h3 style={{ paddingTop: "10px" }}>Registro</h3> */}
            <Row id="search-row">
                <Col id="search-col">
                    <Form id='search-from'>
                        <Form.Group id='search-group'>
                            <Container style={{width: "95%"}}>
                                <Row id='searchform-row'>
                                    <Col sm={8} md={7} lg={6} 
                                        id='search-control'
                                    >
                                        <Form.Control
                                            placeholder='Ingresa una empresa'
                                            onChange={(str) => props.setName(str.target.value)}
                                        />
                                        
                                        {/* <br /> */}
                                    </Col>
                                    {/* <Col sm={4} md={5} lg={6}>
                                        <Dropdown onSelect={handleSelect}>
                                            <Dropdown.Toggle id="btn-search">
                                                Giro
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey="Videojuegos">Videojuegos</Dropdown.Item>
                                                <Dropdown.Item eventKey="Tecnologia">Tecnología</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <br />
                                    </Col> */}
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