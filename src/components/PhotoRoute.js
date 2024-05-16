import { View, TouchableOpacity, Dimensions, StyleSheet, Alert, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PhotoCard from '../screens/PhotoCard';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PhotoRoute = () => {
	const [images, setImages] = useState([]);


	const navigation = useNavigation()

	useEffect(() => {
		const loadImages = async () => {
			try {
				const storedImages = await AsyncStorage.getItem('images');
				if (storedImages) {
					const parsedImages = JSON.parse(storedImages);
					console.log('Stored images:', parsedImages);
					setImages(parsedImages);
				}
			} catch (error) {
				console.error('Error loading images from AsyncStorage:', error);
			}
		};

		loadImages();
	}, []);

	const PickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1
			});

			if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
				const selectedImageUri = result.assets[0].uri;
				console.log('Selected image URI:', selectedImageUri);
				const newImages = [...images, selectedImageUri];
				console.log('New images:', newImages);
				setImages(newImages);
				await AsyncStorage.setItem('images', JSON.stringify(newImages));
				console.log('Images stored in AsyncStorage.');
			}
		} catch (error) {
			console.error('Error picking image:', error);
			Alert.alert('Error', 'Failed to pick image.');
		}
	};

	return (
		<View style={{ flex: 1 }} className="h-screen">
			{/* <ScrollView style={styles.imageContainer} className="flex flex-row items-center gap-1 px-3 mt-2">
				{images.map((image, index) => (
					<Image key={index} source={{ uri: image }} className="h-[200px] w-[200px]" />
				))}
			</ScrollView> */}
			<FlatList
				ListEmptyComponent={
					<Text className="text-center">No Photo Yet!</Text>
				}
				data={images}
				keyExtractor={(item) => item}
				renderItem={({ item }) => {
					return <PhotoCard item={item} navigation={navigation} />;
				}}
			/>
			<View className="absolute bottom-32 right-4 space-y-4 ">
				<TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"
					onPress={PickImage}
				>
					<Ionicons name="image" size={24} color="white" />
				</TouchableOpacity>

			</View>
		</View>
	);
};


const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 5,
	},
	image: {
		width: width / 3 - 10,
		height: width / 3 - 10,
		margin: 5,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 32,
		right: 4,
	},
	button: {
		backgroundColor: 'black',
		padding: 12,
		borderRadius: 50,
	},
});

export default PhotoRoute;
