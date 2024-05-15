import { View, Text, Image, Dimensions, Modal, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { photos } from '../data/data';
import { ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { postMedia } from '../api/multimediaApi';
import { API_CLOUDARE_URL } from '../api/ApiManager';
import Uploading from './Uploading';



const { width, height } = Dimensions.get('window');


const PhotoRoute = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false)
	const [progress, setProgress] = useState(0)
	const [multimedia, setMultimedia] = useState([])

	const toggleModal = (image) => {
		setSelectedImage(image);
		setIsModalVisible(!isModalVisible);
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => toggleModal(item)}>
				<View style={{ margin: 2, padding: 2, borderRadius: 8, backgroundColor: 'lightgray' }}>
					<Image
						source={{ uri: item.link }}
						style={{ width: '100%', height: 200, borderRadius: 8 }}
						resizeMode="cover"
					/>
				</View>
			</TouchableOpacity>
		);
	};

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
			}
		} catch (error) {
			console.error('Error picking image:', error);
		}
	}

	async function getPics() {
		setImage(undefined);

		await image.stopAndUnloadAsync();
		let allRecordings = [...photos];
		
		allRecordings.push();

		setPh(allRecordings);
		console.log('Stop recording...')
		await uploadAudioFile(recording);
		console.log('Start Uploading...')
	}


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


	return (
		<View style={{ flex: 1 }} className="h-screen">
			<Modal
				visible={isModalVisible}
				transparent={true}
				onRequestClose={() => toggleModal(null)}
			>
				<View style={styles.modalContainer}>
					<TouchableOpacity style={{ flex: 1 }} onPress={() => toggleModal(null)}>
						<Image
							source={{ uri: selectedImage?.link }}
							style={styles.modalImage}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>
			</Modal>
			<View className="absolute bottom-32 right-4 space-y-4 ">
				<TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"
					onPress={PickImage}
				>
					<Ionicons name="image" size={24} color="white" />
				</TouchableOpacity>

			</View>
		</View>
	)
}

export default PhotoRoute

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
	modalImage: {
		width: width - 40,
		height: height - 40,
	},
});