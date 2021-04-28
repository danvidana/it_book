import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "./API";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
	const firebase = useContext(FirebaseContext);
	var tempUser = JSON.parse(localStorage.getItem("authUser"));
	if (tempUser !== null) {
		tempUser["isAdmin"] = localStorage.getItem("isAdmin");
	}
	const [currentUser, setCurrentUser] = React.useState(tempUser);

	const fetchCurrentUser = async () => {
		firebase
			.getAuthUser()
			.then((user) => {
				if (user !== null) {
					localStorage.setItem("authUser", JSON.stringify(user));
					localStorage.setItem("isAdmin", false);
					firebase.firestore
						.collection("adminUsers")
						.doc(user.email)
						.get()
						.then((doc) => {
							if (doc.exists) {
								localStorage.setItem("isAdmin", true);
							} else {
								console.log(doc);
								localStorage.setItem("isAdmin", false);
							}
						})
						.catch(() => {
							localStorage.setItem("isAdmin", false);
						})
						.finally(() => {
							tempUser = JSON.parse(
								localStorage.getItem("authUser")
							);
							if (tempUser !== null) {
								tempUser["isAdmin"] = localStorage.getItem(
									"isAdmin"
								);
							}
							setCurrentUser(tempUser);
							console.log(currentUser);
						});
				}
			})
			.catch((e) => {
				localStorage.removeItem("authUser");
				localStorage.removeItem("isAdmin");
				setCurrentUser(null);
			});
	};
	useEffect(
		() => {
			fetchCurrentUser();
		},
		// eslint-disable-next-line
		[]
	);

	return (
		<CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
			{children}
		</CurrentUserContext.Provider>
	);
};
