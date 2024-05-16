import { View, Text, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Uploading from '../components/Uploading'
import { Ionicons } from '@expo/vector-icons'

import { firebase } from '../../firebase'



const AddScreen = () => {
	const uploadFile = async () => {
		console.log('Attempting to upload file...');

		console.log('image selected')
		console.log('uploading...')
		setIsLoading(true);
		try {
			const { uri } = await FileSystem.getInfoAsync(image);


			if (!uri) {
				console.error('URI not found');
				return;
			}
			const filename = image.substring(image.lastIndexOf('/') + 1);

			const formData = new FormData();

			formData.append('file', {
				uri,
				name: filename,
				type: 'image/jpeg',
			});
			formData.append('upload_preset', 'note_data');

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
			Alert.alert('Error', 'Network Failed!');
		}
	};


	const saveImageUrl = async (imageUrl) => {
		try {
			setIsLoading(true)
			postMedia({
				link: imageUrl,
				multimedia_type: 'photo'
			}).then(result => {
				if (result.status === 200) {
					console.log('Login Success');
					Alert.alert("Photo Uploaded Succcessfully!");
				}
			}).catch(error => {
				console.error(error);
			});
		}
		catch (error) {
			console.error('Error saving image URL:', error.message);
			setIsLoading(false)
			Alert.alert('Error', 'Failed to save image URL');
		}
	};


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