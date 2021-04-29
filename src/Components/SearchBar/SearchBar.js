import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Row, Col,} from "react-bootstrap";
import "./SearchBar.css";
// Componente del formulario para dar de alta una empresa

const SearchBar = (props) => {
	const firebase = useContext(FirebaseContext);
    
    

	return (
		<div id='searchbox' className='justify-content-center'>
            {/* <h3 style={{ paddingTop: "10px" }}>Registro</h3> */}
            <Row id="search-row">
                <Col id="search-col">
                    <Form id='search-from'>
                    <Form.Group id='search-group'>
                            <Row id='searchform-row'>
                                <Col sm={8} md={7} lg={6} 
                                    id='search-control'
                                >
                                    <Form.Control
                                        placeholder='Ingresa una empresa'
                                        onChange={(str) => props.setName(str.target.value)}
                                    />
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