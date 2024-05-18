import React, { useState, useEffect, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ModalNotification from "../components/notifications/Notification";
import COLORS from "../components/colors/colors";
import SaveNote from "../components/notes/saveNote";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddNotesScreen = ({ route, navigation }) => {
	const [date, setDate] = useState(new Date());
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [modalVisible, setModalVisible] = useState(false);
	const [userId, setUserId] = useState('');
	const [loading, setLoading] = useState(false);




	useEffect(() => {
		// Function to fetch access token from AsyncStorage
		const fetchUserId = async () => {
			try {
				const id = await AsyncStorage.getItem('userId');
				if (id !== null) {
					// Access token found in AsyncStorage
					setUserId(id);
				} else {
					// Access token not found in AsyncStorage
					console.log('User Id not found');
				}
			} catch (error) {
				// Error retrieving data
				console.error('Error fetching user id:', error);
			}
		};

		// Call the function to fetch access token when the component mounts
		fetchUserId();

		// Cleanup function (optional)
		return () => {
			// Any cleanup code here
		};
	}, []); // Empty dependency array ensures the effect runs only once


	console.log('userId: ', userId)

	useEffect(() => {
		if (route.params.note) {
			setNote(route.params.note);
		}
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							justifyContent: "flex-end",
							paddingRight: 20,
						}}
					>
						{/* <TouchableOpacity onPress={() => Save(note, navigation)}>
                <Feather name="save" size={24} color="black" />
              </TouchableOpacity> */}
						<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
							<Feather name="bell" size={24} color="white" />
						</TouchableOpacity>
						{/* <TouchableOpacity onPress={() => Delete(note, navigation)}>
                <Feather name="trash-2" size={24} color="black" />
              </TouchableOpacity> */}
					</View>
				);
			},
		});
	}, [navigation, title, description]);

	const handlePostNewNote = async () => {
		console.log('processing new note:');

		try {
			setLoading(true)
			const response = await axios.post('https://note-taking-app-p5rt.onrender.com/notes', {
				userId: userId,
				title: title,
				description: description
			});

			console.log('notes data:', response.data)

			// if (response.status === 200) {

			// Alert.alert("Account Activated!😊");
			navigation.navigate("Notes");
			setLoading(false)
			// } else {
			// 	console.error('SignUp failed:', response?.data);
			// 	// Handle login failure, show error message, etc.
			// 	setLoading(false)
			// }
		} catch (error) {
			console.error('Error during signup:', error);
			setLoading(false)
			// Handle network errors, etc.
		}
	};


	return (
		<SafeAreaView className="bg-slate-300 flex-1 h-screen p-4">
			<TextInput
				style={Style.txtTitleNote}
				autoFocus={true}
				maxLength={40}
				value={title}
				placeholder={"Title"}
				onChangeText={(text) => setTitle(text)}
			></TextInput>
			<TextInput
				style={Style.txtInput}
				multiline={true}
				value={description}
				placeholder={"Description"}
				onChangeText={(text) => setDescription(text)}
			></TextInput>
			{/* <ModalNotification
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				date={date}
				setDate={setDate}
				note={note}
				setNote={setNote}
			/> */}
			<View className="absolute bottom-10 left-0 right-0 flex flex-row px-24 gap-10">
				<TouchableOpacity
					style={[
						Style.actionButton,
						{
							backgroundColor: "#e87717",
							flex: 1,
						},
					]}
					onPress={handlePostNewNote}
				>
					{loading ? <ActivityIndicator /> : (
						<Feather name="save" size={20} color="white" />
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						Style.actionButton,
						{
							backgroundColor: "#DF4843",
							flex: 1,
						},
					]}
					onPress={() => Delete(note, navigation)}
				>
					<Feather name="trash-2" size={20} color="white" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default AddNotesScreen


const Style = StyleSheet.create({
	conteiner: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		backgroundColor: COLORS.noteBackground,
		margin: 20,
	},
	txtInput: {
		fontSize: 18,
		padding: 15,
		borderWidth: 0.5,
		borderRadius: 10,
		width: "100%",
		height: "50%",
	},
	txtTitleNote: {
		width: "100%",
		padding: 15,
		borderWidth: 0.5,
		borderRadius: 10,
		marginBottom: 20,
		fontSize: 20,
		color: "#808080",
	},
	actionButton: {
		borderRadius: 10,
		width: 20,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		// margin: 10
	},
});