import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "./API";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
	const firebase = useContext(FirebaseContext);
	var tempUser = JSON.parse(localStorage.getItem("authUser"));
	if (tempUser !== null) {
		tempUser["userData"] = JSON.parse(localStorage.getItem("userData"));
	}
	const [currentUser, setCurrentUser] = React.useState(tempUser);

	const fetchCurrentUser = async () => {
		firebase
			.getAuthUser()
			.then((user) => {
				if (user !== null) {
					localStorage.setItem("authUser", JSON.stringify(user));
					firebase.firestore
						.collection("user")
						.doc(user.uid)
						.get()
						.then((doc) => {
							console.log(doc.data());
							var data = doc.data();
							localStorage.setItem(
								"userData",
								JSON.stringify(data)
							);
						})
						.catch(() => {
							throw new Error("Could not get user data");
						})
						.finally(() => {
							tempUser = JSON.parse(
								localStorage.getItem("authUser")
							);
							if (tempUser !== null) {
								tempUser["userData"] = JSON.parse(
									localStorage.getItem("userData")
								);
							}
							setCurrentUser(tempUser);
							console.log(currentUser);
						});
				}
			})
			.catch((e) => {
				localStorage.removeItem("authUser");
				localStorage.removeItem("userData");
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
