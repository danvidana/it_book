import React, { useContext, useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { FirebaseContext } from "../../API";
import { CurrentUserContext } from "../../CurrentUserContext";

const AdminPanel = () => {
	const firebase = useContext(FirebaseContext);
	const { currentUser } = React.useContext(CurrentUserContext);
	const [usuarios, setUsuarios] = useState([]);
	const [toggleReload, setToggleReload] = useState(false);
	const history = useHistory();

	if (currentUser === null || currentUser === undefined) {
		history.push("/");
	} else if (!currentUser.userData.isAdmin) {
		history.push("/");
	}

	useEffect(() => {
		firebase.getNonAdminUsers().then((users) => {
			const listaUsuarios = users.map((user) => {
				let button = null;
				if (!user.isSubadmin) {
					button = (
						<Button
							variant='danger'
							style={{ alignSelf: "flex-end" }}
							onClick={() => {
								firebase.makeSubadmin(user.id);
								setToggleReload((prevState) => {
									return !prevState;
								});
							}}
						>
							Make admin
						</Button>
					);
				} else {
					button = (
						<Button
							variant='danger'
							style={{ alignSelf: "flex-end" }}
							onClick={() => {
								firebase.removeSubadmin(user.id);
								setToggleReload((prevState) => {
									return !prevState;
								});
							}}
						>
							Remove admin priviledges
						</Button>
					);
				}
				return (
					<ListGroupItem key={user.id} style={{ display: "flex" }}>
						<span
							style={{
								flexGrow: 4,
								alignSelf: "flex-start",
								textAlign: "left",
							}}
						>
							{user.email}
						</span>
						{button}
					</ListGroupItem>
				);
			});
			setUsuarios(listaUsuarios);
		});
	}, [firebase, toggleReload]);

	return <ListGroup>{usuarios}</ListGroup>;
};

export default AdminPanel;
