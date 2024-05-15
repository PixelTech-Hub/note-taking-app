import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

const ModalNotification = ({
	modalVisible,
	setModalVisible,
	date,
	setDate,
	note,
	setNote,
}) => {
	const [showPicker, setShowPicker] = useState({
		showDate: false,
		showHours: false,
	});

	async function schedulePushNotification() {
		const id = await Notifications.scheduleNotificationAsync({
			content: {
				title: `Notification: ${note.title.substr(0, 40)}`,
				body: note.note.substr(0, 50),
			},
			trigger: {
				date: date,
			},
		});
		setNote({ ...note, notificationId: id });
	}

	const onChange = (event, selectedDate) => {
		setShowPicker({ showDate: false, showHours: false });
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	const currentFormattedData = (type) => {
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		const hours = date.getHours();
		const min = date.getMinutes();
		if (type === "date") {
			return day + "/" + month + "/" + year;
		} else {
			return hours + ":" + min;
		}
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
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
						SELECT A TIME TO GET NOTIFIED FOR THE NOTE!
					</Text>
					<View>
						<View className="flex flex-row items-center gap-24">
							<Text className="text-lg font-bold">DATE:</Text>
							<TouchableOpacity
								style={Style.buttonHours}
								onPress={() => setShowPicker({ ...showPicker, showDate: true })}
							>
								<Text style={Style.txtHours}>{currentFormattedData("date")}</Text>
							</TouchableOpacity>
						</View>
						{showPicker.showDate && (
							<DateTimePicker mode="date" value={date} onChange={onChange} />
						)}
						<View className="flex flex-row items-center gap-24">
							<Text className="text-lg font-bold">TIME</Text>
							<TouchableOpacity
								style={Style.buttonHours}
								onPress={() => setShowPicker({ ...showPicker, showHours: true })}
							>
								<Text style={Style.txtHours}>
									{currentFormattedData("hours")}
								</Text>
							</TouchableOpacity>
						</View>
						{showPicker.showHours && (
							<DateTimePicker mode="time" value={date} onChange={onChange} />
						)}
					</View>
					<View style={Style.modalButtons}>
						<TouchableOpacity
							style={[Style.button, Style.buttonSave]}
							onPress={() => {
								schedulePushNotification();
								setModalVisible(!modalVisible);
							}}
						>
							<Text clas style={Style.txtStyle}>SET</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[Style.button, Style.buttonCancel]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={Style.txtStyle}>CANCEL</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ModalNotification;


const Style = StyleSheet.create({
	modalView: {
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 35,
		height: "50%",
		alignItems: "center",
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