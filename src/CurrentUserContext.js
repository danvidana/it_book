import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "./API";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
	const firebase = useContext(FirebaseContext);
	const [currentUser, setCurrentUser] = React.useState(
		JSON.parse(localStorage.getItem("authUser"))
	);

	const fetchCurrentUser = async () => {
		firebase
			.getAuthUser()
			.then((user) => {
				localStorage.setItem("authUser", JSON.stringify(user));
				setCurrentUser(JSON.stringify(user));
			})
			.catch((e) => {
				localStorage.removeItem("authUser");
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
