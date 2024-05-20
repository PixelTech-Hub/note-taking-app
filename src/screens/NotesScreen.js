import React, { useEffect, useState } from "react";
import {
	FlatList,
	TouchableOpacity,
	Text,
	ActivityIndicator,
	View,
	StyleSheet
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SearchBar from '../components/search/SearchBar';
import Colors from '../components/colors/colors';
import Notes from '../components/notes/RenderNotes';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const NotesScreen = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState('');

	const navigation = useNavigation()

	useEffect(() => {
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
	}, [data]); // Empty dependency array ensures the effect runs only once



	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				console.log('processing data...')
				// Make API call using Axios
				const response = await axios.get(`https://note-taking-app-p5rt.onrender.com/notes/user/${userId}`);
				// Assuming your API returns JSON data
				setData(response?.data);
				setLoading(false);
			} catch (error) {
				console.log('error fetching:', error)
				setLoading(false);
			}
		};

		fetchData(); // Call the fetchData function
	}, [data]);

	console.log('fetching data....=', data?.data);

	return (
		<SafeAreaView
			className="bg-[#00283A] flex-1 h-screen px-2"
		>
			<Text className="text-white font-bold py-6 text-2xl text-center">MY NOTES</Text>
			<SearchBar data={data?.data} onChange={setData} />

			<FlatList
				ListEmptyComponent={
					<Text className="text-center text-white py-4 text-xl">No Data!</Text>
				}
				data={data?.data}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					return <Notes item={item} navigation={navigation} />;
				}}
			/>

			<TouchableOpacity
				// className="absolute -bottom-[550px] right-10"
				style={Style.newNoteButton}
				onPress={() => navigation.navigate("Add Notes", { search: false })}

			>
				<AntDesign name="pluscircle" size={50} color={Colors.addButton} />
			</TouchableOpacity>
		</SafeAreaView>
	)
}

export default NotesScreen

const Style = StyleSheet.create({
	conteiner: {
		flex: 1,
		// paddingHorizontal: 20,
		// paddingTop: 20,
		// marginTop: 20
	},
	txtInput: {
		fontSize: 18,
		padding: 15,
		borderWidth: 0.5,
		borderRadius: 10,
		width: "100%",
		height: "15%",
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
		width: 70,
		height: 70,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
	},
	newNoteButton: {
		zIndex: 9,
		position: "absolute",
		bottom: 60,
		right: 20,
		backgroundColor: "#fff",
		borderRadius: 100,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
});