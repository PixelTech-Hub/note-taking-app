import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, SafeAreaView, ScrollView, Text, View, useWindowDimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MediaTab from '../tab/MediaTab'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'


const Stack = createStackNavigator()


const FirstRoute = () => (
	<View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
	<View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
	first: FirstRoute,
	second: SecondRoute,
});

const DashboardNavigator = () => {
	const [greeting, setGreeting] = React.useState('');
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false)
	const [progress, setProgress] = useState(0)
	// const navigation = useNavigation()

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		checkLoginStatus();
	}, []);

	const checkLoginStatus = async () => {
		const accessToken = await AsyncStorage.getItem('accessToken');
		setIsLoggedIn(!!accessToken);
	};

	console.log('Login: Yes/No', isLoggedIn)


	useEffect(() => {

		// fetchUserDetails()
		const currentHour = new Date().getHours();
		let greetingText = 'Good Morning,';

		if (currentHour >= 12 && currentHour < 18) {
			greetingText = 'Good Afternoon,';
		} else if (currentHour >= 18) {
			greetingText = 'Good Evening,';
		}
		setGreeting(greetingText);
	}, []);


	// ********** | PHOTO LOGIC | *****************


	const PickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
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


	// ********** | VIDEO LOGIC | *****************


	// Call fetchUserData wherever you need to retrieve user data
	fetchUserData();
	return (
		<SafeAreaView className="relative  bg-gray-900 h-screen ">
			<View className=" px-4 flex flex-row items-center justify-between">
				<View>
					<Text className="text-white font-bold text-lg">{greeting}</Text>
					<Text className="text-white font-bold text-lg">Nathan</Text>
					<Text></Text>
				</View>
				<View className="bg-white w-12 h-12 items-center justify-center text-center rounded-full p-1">
					<Text className="font-bold">Nath</Text>
				</View>
			</View>
			<MediaTab />

		</SafeAreaView>
	)
}

export default DashboardNavigator