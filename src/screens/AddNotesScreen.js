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

const AddNotesScreen = ({ route, navigation }) => {
	const [date, setDate] = useState(new Date());
	const [note, setNote] = useState({
		title: "",
		note: "",
		date: date,
		notificationId: null,
	});
	const [modalVisible, setModalVisible] = useState(false);



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
	}, [navigation, note]);
	return (
		<SafeAreaView style={Style.conteiner}>
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
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "center",
					marginTop: 10,
					position: "absolute",
					bottom: 0,
				}}
			>
				<TouchableOpacity
					style={[
						Style.actionButton,
						{
							backgroundColor: "#017CE9",
							flex: 1,
						},
					]}
					onPress={() => SaveNote(note, navigation)}
				>
					<Feather name="save" size={29} color="white" />
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
					<Feather name="trash-2" size={24} color="white" />
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
});