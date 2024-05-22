import React, { useState, useEffect, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ModalNotification from "../components/notifications/Notification";
import COLORS from "../components/colors/colors";
import SaveNote from "../components/notes/saveNote";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalShareCard from "../components/ModalShareCard";

const AddNotesScreen = ({ route, navigation }) => {
	const [date, setDate] = useState(new Date());
	const [note, setNote] = useState({
		title: "",
		note: "",
		date: date,
		notificationId: null,
	});
	const [modalVisible, setModalVisible] = useState(false);
	const [openShare, setOpenShare] = useState(false);



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
						<TouchableOpacity onPress={() => setOpenShare(!openShare)}>
							<Feather name="share-2" size={24} color="white" />
						</TouchableOpacity>
					</View>
				);
			},
		});
	}, [navigation, note]);
	return (
		<SafeAreaView className="bg-slate-300 flex-1 h-screen p-4">
			<TextInput
				style={Style.txtTitleNote}
				autoFocus={true}
				maxLength={40}
				value={note.title}
				placeholder={"Title"}
				onChangeText={(text) => setNote({ ...note, title: text })}
			></TextInput>
			<TextInput
				style={Style.txtInput}
				multiline={true}
				value={note.note}
				placeholder={"Description"}
				onChangeText={(text) => setNote({ ...note, note: text })}
			></TextInput>
			<ModalNotification
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				date={date}
				setDate={setDate}
				note={note}
				setNote={setNote}
			/>
			<ModalShareCard
				openShare={openShare}
				setOpenShare={setOpenShare}
				note={note}
				setNote={setNote} 
			/>
			<View className="absolute bottom-10 left-0 right-0 flex flex-row px-24 gap-10">
				<TouchableOpacity
					style={[
						Style.actionButton,
						{
							backgroundColor: "#e87717",
							flex: 1,
						},
					]}
					onPress={() => SaveNote(note, navigation)}
				>
					<Feather name="save" size={20} color="white" />
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