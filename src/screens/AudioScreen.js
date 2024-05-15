import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { audios } from '../data/data';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import { API_CLOUDARE_URL } from '../api/ApiManager';
import { SafeAreaView } from 'react-native-safe-area-context';

const AudioScreen = () => {
	const [recording, setRecording] = React.useState();
	const [recordings, setRecordings] = React.useState([]);
	const [currentSound, setCurrentSound] = useState(null);
	const [isLoading, setIsLoading] = useState(false)

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
		//   await uploadAudioFile(recording);
		console.log('Start Uploading...')
	}

	function getDurationFormatted(milliseconds) {
		const minutes = milliseconds / 1000 / 60;
		const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
		return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
	}

	const getRecordingLines = async () => {
		return recordings.map((recordingLine, index) => {

			return (
				<View key={index} className="flex-row items-center justify-center mx-2">
					<Text style={Style.fill}>
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

	//**************** UPLOADING AUDIO */
	const uploadAudioFile = async (recording) => {
		console.log('Attempting to upload audio file...');
		if (!recording) {
			console.error('No recording...');
			return;
		}
		console.log('audio uploading...')
		setIsLoading(true);
		try {
			const uri = recording.getURI();
			const filename = uri.substring(uri.lastIndexOf('/') + 1);

			const formData = new FormData();

			formData.append('file', {
				uri: fileUri,
				name: 'file', // Adjust the name as needed
				type: fileType, // Set the correct MIME type for audio files
				mimeType: fileType, // Specify the MIME type explicitly
				extension: fileType === 'audio/mpeg' ? 'mp3' : 'wav', // Specify the file extension based on MIME type
			});
			formData.append('upload_preset', 'insight_preset');

			const response = await fetch(API_CLOUDARE_URL, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			setIsLoading(false);
			console.log('Cloudinary upload result:', data);
			Alert.alert('Audio Uploaded to Cloudinary');
		} catch (error) {
			console.error('Error uploading to Cloudinary:', error);
			setIsLoading(false);
			Alert.alert('Error', 'Network Failed!');
		}
	};

	const saveRecording = async (audioUrl) => {
		try {
			setIsLoading(true)
			postMedia({
				link: audioUrl,
				multimedia_type: 'audio'
			}).then(result => {
				if (result.status === 200) {
					console.log(' Audio Uploaded Successfully');
					Alert.alert("Audio Uploaded Succcessfully!");
				}
			}).catch(error => {
				console.error(error);
			});
		}
		catch (error) {
			console.error('Error saving image URL:', error.message);
			setIsLoading(false)
			Alert.alert('Error', 'Failed to save audio URL');
		}
	};

	function clearRecordings() {
		setRecordings([])
	}
	return (
		<SafeAreaView className="relative px-2">
			{/* <Text style={Style.txtTitleNote}>AUDIO RECORDINGS</Text> */}
			<View className="flex-row items-center justify-between mx-4 ">
				<TouchableOpacity className="p-1 rounded-md  flex  justify-center items-center" onPress={recording ? stopRecording : startRecording} >
					<View className="text-xl text-center text-white font-semibold">
						{recording ?
							<View className="bg-red-500 flex flex-row p-1 rounded-lg items-center">
								<Ionicons name='stop' size={20} color="white" />
								<Text className="text-white text-lg">Stop</Text>
							</View>
							:
							<View className="bg-green-500 flex flex-row p-1 rounded-lg items-center">
								<Ionicons name='play' size={20} color="white" />
								<Text className="text-white text-lg">Start</Text>
							</View>
						}
					</View>
				</TouchableOpacity>
				{/* {recordings.length > 0 && (
				  <TouchableOpacity onPress={clearRecordings} className=" bg-red-500 p-1 px-4 rounded-md  flex  justify-center items-center">
					  <Text className="text-white text-lg"> {recordings.length > 0 ? 'Clear Recordings' : ''}</Text>
				  </TouchableOpacity>
			  )} */}
			</View>
			<View className="">
				{recordings.length === 0 ? <Text className="text-center pt-10 pb-10">No recordings yet</Text> : getRecordingLines()}
			</View>

		</SafeAreaView>
	)
}

export default AudioScreen

const Style = StyleSheet.create({
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
});