import React, { useState } from "react";
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

const NotesScreen = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigation = useNavigation()

	useFocusEffect(
		React.useCallback(() => {
			setLoading(true);
			const getData = async () => {
				try {
					let notes = await AsyncStorage.getItem("notes");
					if (notes === undefined || notes === null) {
						notes = "[]";
					}
					if (notes.length > 0 && notes[0] !== "[") {
						notes = `[${notes}]`;
					}
					setData(JSON.parse(notes));
					setLoading(false);
				} catch (err) {
					console.log(err);
					alert("Error loading notes");
				}
			};
			getData();
		}, [])
	);
	if (loading) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator size={"large"} color={Colors.loading} />
			</View>
		);
	} else {
		return (
			<SafeAreaView
				className="bg-[#00283A] flex-1 h-screen px-2"
			>
				<Text className="text-white font-bold py-6 text-2xl text-center">MY NOTES</Text>
				<SearchBar data={data} onChange={setData} />
				<FlatList
					ListEmptyComponent={
						<Text className="text-center">No Data!</Text>
					}
					data={data}
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