import { View, Text, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Uploading from '../components/Uploading'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { firebase } from '../../firebase'

const couldare_key = 'dgfsgfzee';
export const API_BASE_URL = 'http://localhost:3000';
export const API_CLOUDARE_URL = `https://api.cloudinary.com/v1_1/${couldare_key}/image/upload`;
export const API_SAVE_IMAGE_URL = `${API_BASE_URL}/multimedia`;

const AddScreen = () => {
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false)
	const [progress, setProgress] = useState(0)
	const [multimedia, setMultimedia] = useState([])

	const PickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1
			});
			// console.log('ImagePicker result:', result);

			if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
				const selectedImageUri = result.assets[0].uri;
				console.log('Selected image URI:', result.assets[0].uri);
				setImage(result.assets[0].uri);
				await uploadFile(selectedImageUri);
			} else {
				console.log('No image selected..');
			}
		} catch (error) {
			console.error('Error picking image:', error);
		}
	}


	const uploadFile = async () => {
		console.log('Attempting to upload file...');
		if (!image) {
			console.error('No image selected from upload file function');
			return;
		}
		console.log('image selected')
		console.log('uploading...')
		setIsLoading(true);
		try {
			const { uri } = await FileSystem.getInfoAsync(image);
			const filename = image.substring(image.lastIndexOf('/') + 1);

			const formData = new FormData();

			formData.append('file', {
				uri,
				name: filename,
				type: 'image/jpeg',
			});
			formData.append('upload_preset', 'insight_preset');

			const response = await fetch(API_CLOUDARE_URL, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			setIsLoading(false);
			console.log('Cloudinary upload result:', data);
			saveImageUrl(data.url); // Call function to save URL
			Alert.alert('Photo Uploaded to Cloudinary');
			setImage(null);
		} catch (error) {
			console.error('Error uploading to Cloudinary:', error);
			setIsLoading(false);
			Alert.alert('Error', 'Failed to upload photo');
		}
	};

	const saveImageUrl = async (imageUrl) => {
		try {
			setIsLoading(true)
			const response = await fetch(API_SAVE_IMAGE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ link: imageUrl }),
			});

			if (!response.ok) {
				throw new Error('Failed to save image URL: ' + response.status);
			}

			const data = await response.json();
			setIsLoading(false)
			console.log('Image URL saved:', data);
		} catch (error) {
			console.error('Error saving image URL:', error.message);
			setIsLoading(false)
			Alert.alert('Error', 'Failed to save image URL');
		}
	};
	useEffect(() => {
		const fetchImageData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(API_SAVE_IMAGE_URL);

				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}

				const data = await response.json();
				setMultimedia(data);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error.message);
				setIsLoading(false);
				// Handle error
			}
		};

		fetchImageData(); // Call the function when component mounts
	}, []);


	console.log('data media', multimedia)
	const data = multimedia.data;

	return (
		<SafeAreaView className="flex bg-gray-900 h-screen ">
			{isLoading ? (
				<View>
					<Text className="text-white">Loading...</Text>
				</View>
			) : (
				data ? (
					<View className="grid grid-cols-3">
						{data?.map(data => {
							const image = data.link
							return (
								<View key={data.id}>
									<Image
										source={{ uri: image }}
										style={{
											width: 300,
											height: 300,
											resizeMode: "contain",
											borderRadius: 6,
										}}
									/>
								</View>
							)
						})}
					</View>
				) : (
					<View>
						<Text>No data..</Text>
					</View>
				)
			)}



			{image &&
				<View className="flex justify-center items-center">
					<Uploading
						image={image}
						progress={progress}
					/>
				</View>
			}
			<View className="absolute bottom-32 right-4 space-y-4 ">
				<TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"
					onPress={PickImage}
				>
					<Ionicons name="image" size={24} color="white" />
				</TouchableOpacity>
				{/* <TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"

				>
					<Ionicons name="videocam" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"

				>
					<Ionicons name="audiocam" size={24} color="white" />
				</TouchableOpacity> */}

			</View>

		</SafeAreaView>
	)
}

export default AddScreen