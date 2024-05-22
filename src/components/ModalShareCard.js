import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View, Platform, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import UserCard from "./UserCard";

const ModalShareCard = ({ openShare, setOpenShare, note, setNote }) => {
	// const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)


	const users = [
		{
			"id": "978864bc-09b0-4c50-a28f-f806ea5921fe",
			"updatedAt": "2024-05-20T08:27:04.081Z",
			"createdAt": "2024-05-20T08:27:04.081Z",
			"name": "Okello Ivan",
			"email": "Ivanokello@gmail.com",
			"password": "$2b$10$pYfe3I3dRNzNh6/oq/93p.Sen9tGo0ViN/zZsCALmRct/bwF9DPMi"
		},
		{
			"id": "caf0b1d5-3f0a-4ab8-937d-f1ddf0f6492e",
			"updatedAt": "2024-05-18T06:47:20.112Z",
			"createdAt": "2024-05-18T06:47:20.112Z",
			"name": "Oyella Polline",
			"email": "Polline@gmail.com",
			"password": "$2b$10$7wg4eF6X80LOj9O2RlwY2Onz0ebQKpYOpQf04C6qYA3CyB.FfCrV."
		},
		{
			"id": "65b04529-5615-4e76-a909-40b55b362f8c",
			"updatedAt": "2024-05-17T14:15:19.526Z",
			"createdAt": "2024-05-17T14:15:19.526Z",
			"name": "Apolot Jessica",
			"email": "jessicaapolot256@gmail.com",
			"password": "$2b$10$5BfxszpmrU87NAIK5rTSXeBrrgHMkrzIdaEW2wmpKS/.H4NdDkS8S"
		},
		{
			"id": "8dd64fb6-4a55-4575-9459-f668fb6fc3a1",
			"updatedAt": "2024-05-17T14:09:50.224Z",
			"createdAt": "2024-05-17T14:09:50.224Z",
			"name": "Okumu Daniel Comboni",
			"email": "ookumucomboni@gmail.com",
			"password": "$2b$10$JxnNO4DreaFh2DYrByLOheIwSoLGXISFRANZdEa1KCATed187e.cG"
		},
		{
			"id": "ecd47a86-87d2-47aa-8522-c05c088c17a4",
			"updatedAt": "2024-05-17T14:08:07.132Z",
			"createdAt": "2024-05-17T14:08:07.132Z",
			"name": "Job one",
			"email": "joblne@gmail.com",
			"password": "$2b$10$.Q9eaTsteTeue6A6Luw/PeAJ83TO1q7wnsN1Jy090A5urSseRqNV."
		},
		{
			"id": "4d938df1-a4e6-4488-a74d-96d6d2716783",
			"updatedAt": "2024-05-17T13:52:15.290Z",
			"createdAt": "2024-05-17T13:52:15.290Z",
			"name": "Oklahoma Street",
			"email": "sstreet@gmail.com",
			"password": "$2b$10$ZsjajWcLf.0ZrGYrpYUOGehSNJrH/rZR3Hz/gzP7x149phWfeIq7W"
		},
		{
			"id": "e9510067-90df-43d7-babc-f33eb1515685",
			"updatedAt": "2024-05-17T13:48:27.992Z",
			"createdAt": "2024-05-17T13:48:27.992Z",
			"name": "Ivan Okello",
			"email": "okelloivan5@gmail.com",
			"password": "$2b$10$XDlCJyvSKXVJivlNjyx7heLfl5viif9fj/vlK5oifuBapeF64wBgO"
		},
		{
			"id": "759651ec-c6ad-45e6-9dc5-29da6d0f728c",
			"updatedAt": "2024-05-17T13:47:48.594Z",
			"createdAt": "2024-05-17T13:47:48.594Z",
			"name": "Ivan Okello",
			"email": "okelloivan@gmail.com",
			"password": "$2b$10$ugtIZdONov285n9/E0etkuTgOT7UEH3aagMkKUep8lnC1xAGD1kqC"
		},
		{
			"id": "7e63b1fd-d9e0-49ee-8305-c462a3d5d596",
			"updatedAt": "2024-05-17T13:45:21.590Z",
			"createdAt": "2024-05-17T13:45:21.590Z",
			"name": "Omo",
			"email": "oomomo@gmail.com",
			"password": "$2b$10$Eof3X994DPadUJYYcehjLuPp2momXDNkVuU5CLt98amSXNIP/FWN2"
		},
		{
			"id": "717c0ea9-982c-4475-99d1-a7ec71a47d27",
			"updatedAt": "2024-05-17T13:40:18.516Z",
			"createdAt": "2024-05-17T13:40:18.516Z",
			"name": "Okidi Simon",
			"email": "simon@gmail.com",
			"password": "$2b$10$dJ/1hGlnv7bGKpUF1jOJFOXnJqitALAKdTcezfAGuCQRvs5x.jMZ6"
		},
		{
			"id": "177ebcd0-37b5-4c64-88af-275b27cad898",
			"updatedAt": "2024-05-17T12:58:35.888Z",
			"createdAt": "2024-05-17T12:58:35.888Z",
			"name": "Okello John",
			"email": "John@gmail.com",
			"password": "$2b$10$Yhu3dM5kpuC50l0rDl1fie3JNfGN901brk6xZgpWWX8FCsOPHRz/a"
		}
	]

	useEffect(() => {
		const fetchData = async () => {
			console.log('processing users;;')
			try {
				setLoading(true)
				// Make API call using Axios
				const response = await axios.get('https://note-taking-app-p5rt.onrender.com/users');
				// Assuming your API returns JSON data
				setUsers(response.data?.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		fetchData(); // Call the fetchData function
	}, [users]);

	console.log('users', users.data)
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={openShare}
			onRequestClose={() => {
				setOpenShare(!openShare);
			}}
		>
			<View style={Style.centeredView}>
				<View
					style={[
						Style.modalView,
						{ marginTop: Platform.OS === "ios" ? "85%" : "71%" },
					]}
				>
					<Text style={Style.modalText} className="text-center text-lg font-semibold">
						SELECT A USER TO SHARE WITH THEM
					</Text>
					{loading ? <ActivityIndicator color="black" size={20} /> : (
						<FlatList

							data={users}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => {
								return (
									<View className="flex ">
										<TouchableOpacity onPress={() => setOpenShare(!openShare)}>
											<Text className="text-sm">
												{item.name}
											</Text>
										</TouchableOpacity>

									</View>
								);
							}}
						/>
					)}
					<View style={Style.modalButtons}>
						<TouchableOpacity
							style={[Style.button, Style.buttonCancel]}
							onPress={() => setOpenShare(!openShare)}
						>
							<Text style={Style.txtStyle}>CANCEL</Text>
						</TouchableOpacity>
					</View>
				</View>

			</View>
		</Modal>
	)
}

export default ModalShareCard


const Style = StyleSheet.create({
	modalView: {
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 35,
		height: "50%",
		// alignItems: "center",
		justifyContent: "space-between",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
	button: {
		alignItems: "center",
		borderRadius: 20,
		padding: 10,
		width: 100,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonCancel: {
		backgroundColor: "#c70000",
	},
	buttonSave: {
		backgroundColor: "#e87717",
	},
	txtStyle: {
		fontWeight: "bold",
		color: "#fff",
	},
	buttonHours: {
		alignSelf: "center",
		alignItems: "center",
		borderBottomColor: "#000",
		borderBottomWidth: 1,
		width: 150,
		marginBottom: 10,
	},
	txtHours: {
		fontWeight: "bold",
		color: "#000",
		fontSize: 20,
	},
});