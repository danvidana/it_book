import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAVjAmaKMMOfAQittaIIHbddz55fGMayHk",
	authDomain: "it-book-f23b6.firebaseapp.com",
	projectId: "it-book-f23b6",
	storageBucket: "it-book-f23b6.appspot.com",
	messagingSenderId: "751619613621",
	appId: "1:751619613621:web:019c6296762816a3852ffc",
	measurementId: "G-5GZ3K0WQKL",
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.firestore = app.firestore();
		this.types = app.firestore;
		this.functions = app.functions();
		this.storage = app.storage();
	}

	createNewUser = async (email, password) => {
		return this.auth.createUserWithEmailAndPassword(email, password);
	};

	signInWithCredential = async (credential) => {
		return this.auth.signInWithCredential(credential);
	};

	signInWithUserAndPassword = async (email, password) => {
		return this.auth.signInWithEmailAndPassword(email, password);
	};

	signout = () => this.auth.signOut();

	getAuthUser = () =>
		new Promise((resolve, reject) => {
			this.auth.onAuthStateChanged((authUser) => {
				if (authUser) resolve(authUser);
				reject("No logged user!");
			});
		});

	getAllEmpresas = async () => {
		const empresas = await this.firestore.collection("Empresas").get();
		return empresas.docs.map((doc) => {
			var data = doc.data();
			data.id = doc.id;
			return data;
		});
	};

	getEmpresasByName = async (name, limit) => {
		if (name === "") {
			const empresas = await this.firestore
				.collection("Empresas")
				.orderBy("nombre_comercial")
				.limit(limit)
				.get();
			return empresas.docs.map((doc) => {
				var data = doc.data();
				data.id = doc.id;
				return data;
			});
		} else {
			const empresas = await this.firestore
				.collection("Empresas")
				.where("nombre_comercial", "==", name)
				.limit(limit)
				.get();
			return empresas.docs.map((doc) => {
				var data = doc.data();
				data.id = doc.id;
				return data;
			});
		}
	};

	getMoreEmpresasByName = async (name, startAfter, limit) => {
		if (name === "") {
			const empresas = await this.firestore
				.collection("Empresas")
				.orderBy("nombre_comercial")
				.startAfter(startAfter)
				.limit(limit)
				.get();
			return empresas.docs.map((doc) => {
				var data = doc.data();
				data.id = doc.id;
				return data;
			});
		} else {
			const empresas = await this.firestore
				.collection("Empresas")
				.where("nombre_comercial", "==", name)
				.startAfter(startAfter)
				.limit(limit)
				.get();
			return empresas.docs.map((doc) => {
				var data = doc.data();
				data.id = doc.id;
				return data;
			});
		}
	};

	addEmpresa = async (empresa) => {
		await this.firestore.collection("Empresas").add(empresa);
	};

	isAdminUser = async (email) => {
		await this.firestore.collection("adminUsers").doc(email);
	};
}

export default Firebase;
