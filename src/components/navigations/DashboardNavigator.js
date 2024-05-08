import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, SafeAreaView, ScrollView, Text, View, useWindowDimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MediaTab from '../tab/MediaTab'


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

	const getUserID = async () => {
		try {
			const userData = await AsyncStorage.getItem('userData');
			return userData ? JSON.parse(userData).id : null;
			console.log('.....userdata', userData)
		} catch (error) {
			console.error('Error retrieving user ID:', error);
			return null;
		}
	};

	// Function to fetch user data using the user ID
	const fetchUserData = async () => {
		try {
			const userId = await getUserID();
			if (userId) {
				// Make a request to your backend API to fetch user data
				const response = await fetch(`http://localhost:3000/users/${userId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						// Optionally, include authentication token if needed
						// 'Authorization': `Bearer ${accessToken}`
					}
				});
				const userData = await response.json();
				console.log('User data:', userData);
			} else {
				console.error('User ID not found.');
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};



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