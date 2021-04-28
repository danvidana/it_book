import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../API/index";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "./SearchBar.css";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useHistory } from "react-router";

// Componente del formulario para dar de alta una empresa

const SearchBar = () => {
	const firebase = useContext(FirebaseContext);
	const [item, setItem] = useState({
		search: ""
	});

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
                                        onChange={(str) => {
                                            setItem({
                                                ...item,
                                                search: str.currentTarget.value,
                                            });
                                        }}
                                    />
                                    <br />
                                </Col>

                                <Col sm={4} md={5} lg={6}>
                                    <Button
                                        id='btn-search'
                                        className='btn-search'
                                        variant='primary'
                                    >
                                        Buscar
                                    </Button>
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