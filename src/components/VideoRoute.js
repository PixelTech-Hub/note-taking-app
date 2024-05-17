import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ResizeMode, Video } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoCard from '../screens/VideoCard'

const VideoRoute = () => {
	// const video = React.useRef(null);
	const [videos, setVideos] = useState([])

	const navigation = useNavigation()

	useEffect(() => {
		const loadVideos = async () => {
			try {
				const storedVideos = await AsyncStorage.getItem('videos');
				if (storedVideos) {
					const parsedVideos = JSON.parse(storedVideos);
					console.log('Stored videos:', parsedVideos);
					setVideos(parsedVideos);
				}
			} catch (error) {
				console.error('Error loading vidoes from AsyncStorage:', error);
			}
		};

		loadVideos();
	}, []);

	const PickVideo = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Videos,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1
			});

			if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
				const selectedVideoUri = result.assets[0].uri;
				console.log('Selected video URI:', selectedVideoUri);
				const newVideos = [...videos, selectedVideoUri];
				console.log('New Videos:', newVideos);
				setVideos(newVideos);
				await AsyncStorage.setItem('videos', JSON.stringify(newVideos));
				console.log('Videos stored in AsyncStorage.');
			}
		} catch (error) {
			console.error('Error picking video:', error);
			Alert.alert('Error', 'Failed to pick video.');
		}
	};

	return (
		<View style={{ flex: 1 }} className="h-screen">
			<FlatList
				ListEmptyComponent={
					<Text className="text-center">No Photo Yet!</Text>
				}
				data={videos}
				keyExtractor={(item) => item}
				renderItem={({ item }) => {
					return <VideoCard item={item} navigation={navigation} />;
				}}
			/>
			<View className="absolute bottom-20 right-4 space-y-4 ">
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