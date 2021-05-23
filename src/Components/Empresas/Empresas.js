import React, { useContext, useEffect, useState, Fragment } from "react";
import Empresa from "./Empresa/Empresa";
import SearchBar from "../SearchBar/SearchBar";
import { CardDeck, Container } from "react-bootstrap";
import { FirebaseContext } from "../../API/index";
import InfiniteScroll from "react-infinite-scroll-component";

const Empresas = (props) => {
	const maxItems = 15;
	const firebase = useContext(FirebaseContext);
	const [empresas, setEmpresa] = useState([]);
	const [nombre, setNombre] = useState("");
	const [giro, setGiro] = useState("");
	const [lastItem, setLastItem] = useState("");
	const [hasMore, setHasMore] = useState(true);
	const [firstLoad, setFirstLoad] = useState(true);
	const [msgEmpresas, setMsgEmpresas] = useState("")

	useEffect(() => {
		let timer = 500;
		if (firstLoad) {
			timer = 0;
			setFirstLoad(false);
		}
		const timeout = setTimeout(() => {
			retrieveData();
		}, timer);
		return () => {
			console.log("CLEANUP");
			clearTimeout(timeout);
		};
		// eslint-disable-next-line
	}, [firebase, nombre, giro, props.setEmpresa]);

	const retrieveData = () => {
		console.log(giro);
		firebase.getEmpresasByNameGiro(giro, nombre, maxItems).then((result) => {
			if(result.length === 0) {
				setMsgEmpresas("No se encontraron empresas")
			} 
			else {
				setMsgEmpresas("")
			}
			const listaEmpresas = result.map((empresa) => {
				return (
					<Empresa
						key={empresa.id}
						empresa={empresa}
						setEmpresa={props.setEmpresa}
					/>
				);
			});
			setEmpresa(listaEmpresas);
			let lastItemTemp;
			if (result.length !== 0) {
				lastItemTemp = result[result.length - 1].nombre_comercial;
				setLastItem(lastItemTemp);
				if (result.length < maxItems) {
					setHasMore(false);
				} else if (document.body.clientHeight <= window.innerHeight) {
					retrieveMore(lastItemTemp);
				}
			}
			if (result.length < maxItems) {
				setHasMore(false);
			}
		});
	};
	const retrieveMore = (lastItem) => {
		firebase
			.getMoreEmpresasByName(nombre, lastItem, maxItems)
			.then((result) => {
				if (result.length !== 0) {
					const listaEmpresas = result.map((empresa) => {
						return (
							<Empresa
								key={empresa.id}
								empresa={empresa}
								setEmpresa={props.setEmpresa}
							/>
						);
					});
					lastItem = result[result.length - 1].nombre_comercial;
					setLastItem(lastItem);
					setEmpresa((prev) => {
						return prev.concat(listaEmpresas);
					});
					if (result.length < maxItems) {
						setHasMore(false);
					} else if (
						document.body.clientHeight <= window.innerHeight
					) {
						retrieveMore(lastItem);
					}
				} else {
					setHasMore(false);
				}
			});
	};

	return (
		<Fragment>
			<SearchBar setName={setNombre} setGiro={setGiro} />
			<Container style={{ minWidth: "90%" }}>
				<small>{msgEmpresas}</small>
				<InfiniteScroll
					dataLength={empresas.length}
					next={() => {
						retrieveMore(lastItem);
					}}
					hasMore={hasMore}
					loader={
						<div className='loader' key={0}>
							loading...
						</div>
					}
				>
					<CardDeck style={{ width: "100%", margin: "0px" }}>
						{empresas}
					</CardDeck>
				</InfiniteScroll>
			</Container>
		</Fragment>
	);
};

export default Empresas;
