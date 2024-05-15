import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ResizeMode, Video } from 'expo-av'
import { videos } from '../data/data'
import { Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { postMedia } from '../api/multimediaApi';
import { API_CLOUDARE_URL } from '../api/ApiManager'

const VideoRoute = () => {
	// const video = React.useRef(null);
	const [video, setVideo] = useState(null)
	const [status, setStatus] = React.useState({});

	const PickVideo = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Videos,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1
			});
			// console.log('ImagePicker result:', result);
			if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
				const selectedVideoUri = result.assets[0].uri;
				console.log('Selected Video URI:', result.assets[0].uri);
				setVideo(result.assets[0].uri);
				await uploadVideoFile(selectedVideoUri);
			} else {
				console.log('No image selected..');
			}
		} catch (error) {
			console.error('Error picking image:', error);
			Alert.alert("No Video Selected")
		}
	}
	const uploadVideoFile = async () => {
		console.log('Attempting to upload video file...');
		if (!image) {
			console.error('No Video selected from upload file');
			return;
		}
		console.log('video selected')
		console.log('uploading now...')
		setIsLoading(true);
		try {
			const { uri } = await FileSystem.getInfoAsync(video);
			// const filename = image.substring(image.lastIndexOf('/') + 1);
			const filename = video.substring(video.lastIndexOf('/' + 1))

			const formData = new FormData();

			formData.append('file', {
				uri,
				name: filename,
				type: 'video/mp4',
			});
			formData.append('upload_preset', 'insight_preset');

			const response = await fetch(API_CLOUDARE_URL, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			setIsLoading(false);
			console.log('Cloudinary upload result:', data);
			saveVideoUrl(data.url); // Call function to save URL
			Alert.alert('Photo Uploaded to Cloudinary');
			setVideo(null);
		} catch (error) {
			console.error('Error uploading to Cloudinary:', error);
			setIsLoading(false);
			Alert.alert('Error', 'Network Failed!');
		}
	};
	const saveVideoUrl = async (videoUrl) => {
		try {
			setIsLoading(true)
			postMedia({
				link: audioUrl,
				multimedia_type: 'video'
			}).then(result => {
				if (result.status === 200) {
					console.log(' Video Uploaded Successfully');
					Alert.alert("Video Uploaded Succcessfully!");
				}
			}).catch(error => {
				console.error(error);
			});
		}
		catch (error) {
			console.error('Error saving video URL:', error.message);
			setIsLoading(false)
			Alert.alert('Error', 'Failed to save video URL');
		}
	};

	return (
		<View className=" flex-1">
			<FlatList
				ItemSeparatorComponent={() => <View className="pt-1" />}
				data={videos ? videos : []}
				keyExtractor={(item, index) => `${index}`}
				renderItem={(item, index) => {
					return (
						<View className="relative mx-2 mt-2" key={index + item}>
							<Video
								ref={video}
								className="h-[200px] object-cover items-center rounded-lg"
								source={{
									uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
								}}
								useNativeControls
								resizeMode={ResizeMode.COVER}
								isLooping
								onPlaybackStatusUpdate={status => setStatus(() => status)}
							/>
						</View>
					)
				}}
			/>
			<View className="absolute bottom-32 right-4 space-y-4 ">
				<TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"
					onPress={PickVideo}
				>
					<Ionicons name="image" size={24} color="white" />
				</TouchableOpacity>

			</View>
		</View>
	)
}

export default VideoRoute


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
	},
	video: {
		alignSelf: 'center',
		width: 320,
		height: 200,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#000'
	},
});