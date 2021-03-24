import classes from "./App.module.css";
import Empresas from "./Empresas/Empresas";

function App() {
	const empresas = {
		empresa1: {
			nombre: "empresa1",
			id: 1,
		},
		empresa2: {
			nombre: "empresa2",
			id: 2,
		},
	};
	return (
		<div className={classes.App}>
			<Empresas listaEmpresas={empresas} />
		</div>
	);
}

export default App;
