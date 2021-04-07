import React from "react";
import {Form, Button} from "react-bootstrap"
import "./FormEmpresa.css"

// Componente del formulario para dar de alta una empresa

const FormEmpresa = () => {
	return (

        <Form>
            {/* <h2>IT-BOOK</h2> */}
            
            <h5>Datos Públicos</h5>

            <Form.Group controlId="">
                <Form.Label>Nombre Comercial</Form.Label>
                <Form.Control placeholder="Nombre Comercial" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Giro / Especialidad</Form.Label>
                <Form.Control placeholder="Giro / Especialidad" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Descipción de la empresa</Form.Label>
                <Form.Control as="textarea" placeholder="Descipción de la empresa" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Domicilio</Form.Label>
                <Form.Control placeholder="Domicilio" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Colonia</Form.Label>
                <Form.Control placeholder="Colonia" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Municipio</Form.Label>
                <Form.Control placeholder="Municipio" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control placeholder="Código Postal" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control placeholder="Teléfono" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="Correo" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Página Web</Form.Label>
                <Form.Control placeholder="Página Web" />
            </Form.Group>

            <h5>Datos Confidenciales</h5>

            <Form.Group controlId="">
                <Form.Label>Nombre CEO</Form.Label>
                <Form.Control placeholder="Nombre CEO" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Correo CEO</Form.Label>
                <Form.Control placeholder="Correo CEO" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Razón Social</Form.Label>
                <Form.Control placeholder="Razón Social" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Servicios</Form.Label>
                <Form.Control placeholder="Servicios" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Número de empleados en Nuevo León</Form.Label>
                <Form.Control placeholder="Número de empleados en Nuevo León" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Número de empleados en México</Form.Label>
                <Form.Control placeholder="Número de empleados en México" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Número de empleados fuera de México</Form.Label>
                <Form.Control placeholder="Número de empleados fuera de México" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Redes Sociales</Form.Label>
                <Form.Control placeholder="Redes Sociales" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Número de empleados en TI</Form.Label>
                <Form.Control placeholder="Número de empleados en TI" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Número de empleados en Administración</Form.Label>
                <Form.Control placeholder="Número de empleados en Administración" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Porcentaje de ventas nacionales</Form.Label>
                <Form.Control placeholder="Porcentaje de ventas nacionales" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Porcentaje de ventas en el extranjero</Form.Label>
                <Form.Control placeholder="Porcentaje de ventas en el extranjero" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>¿A qué países exporta principalmente?</Form.Label>
                <Form.Control placeholder="¿A qué países exporta principalmente?" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Número de ventas anuales</Form.Label>
                <Form.Control placeholder="Número de ventas anuales" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Certificaciones con las que cuenta la empresa</Form.Label>
                <Form.Control placeholder="Certificaciones con las que cuenta la empresa" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Número de certificaciones con las que cuentan sus empleados</Form.Label>
                <Form.Control placeholder="Número de certificaciones con las que cuentan sus empleados" />
            </Form.Group>

            <Button className="btn-submitForm" variant="primary" type="submit">
                Guardar
            </Button>
        </Form>
    )       
};

export default FormEmpresa;