import React from "react";
import { Container, Image } from "react-bootstrap";
// import { FirebaseContext } from "../../API/index";
import quienes_somosImg from '../../images/quienes_somos.png'
import "./QuienesSomos.css";


const QuienesSomos = () => {


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
	
	return 	<div>
        <div id="quienessomos_img">
            <Image id='mty-image' src={quienes_somosImg} alt='monterrey' />
        </div>
        <Container style={{margin: "20px auto"}}>
            <h3 style={{color: "#f05d29"}}>¿Quiénes Somos?</h3>
            {/* <br /> */}
            <div style={{textAlign: "justify", marginTop: "20px"}}>

                <p>
                    Nuevo León cuenta con una <strong style={{color: "#f05d29"}}>oferta de TI diversificada</strong> que actualmente atiende a diferentes
                    sectores económicos locales, nacionales e internacionales, trabajando en estrecha colaboración con los sectores maduros diversificados,
                    han brindado a nuestra industria de TI local la experiencia necesaria para generar <strong style={{color: "#f05d29"}}>soluciones de software</strong> orientadas a satisfacer las necesidades de las pequeñas, medianas y grandes empresas. 
                </p>

                <p>
                    Monterrey se está convirtiendo en un <strong style={{color: "#f05d29"}}>jugador clave</strong> en la industria de TI, no solo por entregar
                    soluciones <strong style={{color: "#f05d29"}}>innovadoras</strong> y de <strong style={{color: "#f05d29"}}>alta calidad</strong> basadas en procesos rigurosos que cumplen con los más altos
                    estándares y certificaciones internacionales; sino también por el fuerte apoyo que
                    el gobierno proporciona a través de la implementación de iniciativas que prosperan
                    gracias al profundo sentido de <strong style={{color: "#f05d29"}}>colaboración</strong> y <strong style={{color: "#f05d29"}}>competitividad</strong>.
                </p>
                
                <p>
                    Nuestra plataforma actúa como <strong style={{color: "#f05d29"}}>directorio</strong> de la industria de TI en Nuevo León y el norte de México,
                    y está enfocada en poner al alcance de todos información de las numerosas empresas en el ramo de TI.
                </p>

                <p>
                    Buscamos <strong style={{color: "#f05d29"}}>beneficiar</strong> a la industria de TI al proveer una oportunidad para las diversas empresas en el medio a ampliar sus horizontes 
                    y facilitar a los clientes el acceso a la información necesaria para <strong style={{color: "#f05d29"}}>satisfacer</strong> sus necesidades y contactar en un menor tiempo y con mayor enfoque a la compañía que mejor se adapte a sus requerimientos.
                </p>

            </div>
        </Container>
    </div>
    
};

export default QuienesSomos;