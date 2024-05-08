import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { audios } from '../data/data';
import { Audio } from 'expo-av';

const AudioRoute = () => {
	const [recording, setRecording] = React.useState();
	const [recordings, setRecordings] = React.useState([]);

	async function startRecording() {
		console.log('Start recording...')
		try {
			const perm = await Audio.requestPermissionsAsync();
			if (perm.status === "granted") {
				await Audio.setAudioModeAsync({
					allowsRecordingIOS: true,
					playsInSilentModeIOS: true
				});
				const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
				setRecording(recording);
			}
		} catch (err) { }
	}

	async function stopRecording() {
		setRecording(undefined);

		await recording.stopAndUnloadAsync();
		let allRecordings = [...recordings];
		const { sound, status } = await recording.createNewLoadedSoundAsync();
		allRecordings.push({
			sound: sound,
			duration: getDurationFormatted(status.durationMillis),
			file: recording.getURI()
		});

		setRecordings(allRecordings);
		console.log('Stop recording...')
	}

	function getDurationFormatted(milliseconds) {
		const minutes = milliseconds / 1000 / 60;
		const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
		return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
	}

	function getRecordingLines() {
		return recordings.map((recordingLine, index) => {
			return (
				<View key={index} className="flex-row items-center justify-center mx-2">
					<Text style={styles.fill}>
						Recording #{index + 1} | {recordingLine.duration}
					</Text>
					{/* <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button> */}
					<TouchableOpacity onPress={() => recordingLine.sound.replayAsync()} className=" bg-fuchsia-900  px-2 rounded-md  flex  justify-center items-center">
						<Text className="text-white text-lg"> Play</Text>
					</TouchableOpacity>

				</View>
			);
		});
	}

	function clearRecordings() {
		setRecordings([])
	}
	return (
		<View className="relative">
			<View className="flex-row items-center justify-between mx-4 mt-4">
				<TouchableOpacity className="bg-fuchsia-900 p-1 px-4 rounded-md  flex  justify-center items-center" onPress={recording ? stopRecording : startRecording} >
					<Text className="text-xl text-white font-semibold -pb-24">{recording ? 'Stop Recording' : 'Start Recording'}</Text>
				</TouchableOpacity>
				{recordings.length > 0 && (
					<TouchableOpacity onPress={clearRecordings} className=" bg-red-500 p-1 px-4 rounded-md  flex  justify-center items-center">
						<Text className="text-white text-lg"> {recordings.length > 0 ? 'Clear Recordings' : ''}</Text>
					</TouchableOpacity>
				)}
			</View>
			<View className="">
				{recordings.length === 0 ? <Text className="text-center pt-10 pb-10">No recordings yet</Text> : getRecordingLines()}
			</View>

		</View>
	)
}

export default AudioRoute

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10,
		marginRight: 40
	},
	fill: {
		flex: 1,
		margin: 15
	},
	button: {
		backgroundColor: '#ddd'
	}
});