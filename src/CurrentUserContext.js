import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "./API";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
	const firebase = useContext(FirebaseContext);
	const [currentUser, setCurrentUser] = React.useState(null);

	const fetchCurrentUser = async () => {
		firebase
			.getAuthUser()
			.then((user) => {
				console.log(user);
				setCurrentUser(user);
			})
			.catch((e) => {
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
