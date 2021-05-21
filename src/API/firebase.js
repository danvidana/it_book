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

	createNewUserData = async (uid, email) => {
		return this.firestore.collection("user").doc(uid).set({
			email: email,
			empresaID: "",
			hasEmpresa: false,
			isAdmin: false,
			isSubadmin: false,
		});
	};

	removeSubadmin = async (uid) => {
		return this.firestore.collection("user").doc(uid).update({
			isSubadmin: false,
		});
	};

	makeSubadmin = async (uid) => {
		return this.firestore.collection("user").doc(uid).update({
			isSubadmin: true,
		});
	};

	setHasEmpresa = async (uid, hasEmpresa, empresaID = "") => {
		return this.firestore.collection("user").doc(uid).update({
			hasEmpresa: hasEmpresa,
			empresaID: empresaID,
		});
	};

	getNonAdminUsers = async () => {
		var users = await this.firestore
			.collection("user")
			.where("isAdmin", "==", false)
			.get();
		return users.docs.map((doc) => {
			var data = doc.data();
			data.id = doc.id;
			return data;
		});
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

	getEmpresaByID = async (id) => {
		const empresaSnapshot = await this.firestore
			.collection("Empresas")
			.doc(id)
			.get();
		const empresa = empresaSnapshot.data();
		empresa["id"] = empresaSnapshot.id;
		return empresa;
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
				.where('keyword','array-contains',name.toLowerCase())
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

	addEmpresa = async (empresa, image = null) => {
		if (image !== null) {
			empresa["logo"] = await this.uploadFile(image, "images");
		}
		const arrName = [''];
		let curName = '';
		empresa["nombre_comercial"].toLowerCase().split('').forEach((letter)=> {
			curName += letter;
			arrName.push(curName);
		});

		empresa["keyword"] = arrName
		console.log(arrName);

		return this.firestore.collection("Empresas").add(empresa);
	};

	createKeywords = (empresaNombre) => {
		const arrName = [''];
		let curName = '';
		empresaNombre.split('').forEach((letter)=> {
			curName += letter;
			arrName.push(curName);
		});

		return arrName;
	}


	updateEmpresa = async (id, empresa, image = null) => {
		if (image !== null) {
			empresa["logo"] = await this.uploadFile(image, "images");
		}
		
		const arrName = [''];
		let curName = '';
		empresa["nombre_comercial"].toLowerCase().split('').forEach((letter)=> {
			curName += letter;
			arrName.push(curName);
		});
		empresa["keyword"] = arrName
		console.log(arrName);
	
		return this.firestore.collection("Empresas").doc(id).update(empresa);
	};

	uploadFile = async (file, storageFolder) => {
		try {
			const storageRef = this.storage
				.ref()
				.child(`${storageFolder}/${file.name}`);
			await storageRef.put(file);
			return storageRef.getDownloadURL();
		} catch (e) {
			return Promise.reject(e);
		}
	};
}

export default Firebase;
