import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
// import { withNavigation } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context'
import MediaTab from '../components/tab/MediaTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'




const AppScreen = () => {
	const [greeting, setGreeting] = useState("");
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation()


	const username = AsyncStorage.getItem("accessToken");

	console.log('username:', username)

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

	const handleLogout = async () => {
		try {
			await AsyncStorage.removeItem('accessToken');
			navigation.navigate('Login');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};


	const [fullName, setFullName] = useState('');

	useEffect(() => {
		// Function to fetch access token from AsyncStorage
		const fetchUserName = async () => {
			try {
				const name = await AsyncStorage.getItem('name');
				if (name !== null) {
					// Access token found in AsyncStorage
					setFullName(name);
				} else {
					// Access token not found in AsyncStorage
					console.log('User Name not found');
				}
			} catch (error) {
				// Error retrieving data
				console.error('Error fetching user name:', error);
			}
		};

		// Call the function to fetch access token when the component mounts
		fetchUserName();

		// Cleanup function (optional)
		return () => {
			// Any cleanup code here
		};
	}, []); // Empty dependency array ensures the effect runs only once

	console.log(fullName)
	return (
		<SafeAreaView className=" bg-slate-300 flex-1 p-2">
			<View className="flex flex-row items-center justify-between bg-black p-1 rounded-lg mb-4">
				<View className="px-2 pt-2 pb-2">
					<Text className="font-extrabold text-lg text-white">{greeting}</Text>
					<Text className="font-bold text-lg text-white">{fullName}</Text>
					<Text></Text>
				</View>
				<TouchableOpacity onPress={handleLogout}>
					<View className="bg-white px-4   w-16 h-16 items-center justify-center text-center rounded-full p-1">
						<Ionicons name="log-out-outline" size={30} color="black" />
					</View>
				</TouchableOpacity>

			</View>
			{/* <View className="bg-orange-600 p-4 rounded-lg  ">
				<Text className="text-xl text-white text-center font-bold">You are most welcome here</Text>
			</View> */}
			<ScrollView className="px-0 py-3 gap-4">
				<LinearGradient
					// Button Linear Gradient
					colors={['#e87717', '#cf64a6']}
					style={{ borderRadius: 10 }}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate("Videos")}
						className=" rounded-xl p-2 h-[150px] flex flex-row px-4"
					// style={Style.card}
					>
						<View>
							<Ionicons name="videocam-outline" size={150} color="white" />
						</View>
						<View className="flex justify-start text-center px-6 py-10">
							<Text className="text-2xl text-white font-bold text-center"> My Videos</Text>
							<Text className="font-bold text-[16px]">Upload your vidoes here</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient
					// Button Linear Gradient
					colors={['#cf64a6', '#e87717']}
					style={{ borderRadius: 10 }}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate("Photos")}
						className=" rounded-xl p-2 h-[150px] flex flex-row px-4"
					>
						<View>
							<Ionicons name="images" size={120} color="white" />
						</View>
						<View className="flex justify-start text-center px-6 py-10">
							<Text className="text-2xl text-white font-bold text-center"> My Photos</Text>
							<Text className="font-bold text-[16px]">Upload your vidoes here</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient
					// Button Linear Gradient
					colors={['#cf64a6', '#e87717']}
					style={{ borderRadius: 10 }}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate("Audios")}
						className=" rounded-xl p-2 h-[150px] flex flex-row px-4"
					>
						<View>
							<Ionicons name="musical-notes-outline" size={120} color="white" />
						</View>
						<View className="flex justify-start text-center px-6 py-10">
							<Text className="text-2xl text-white font-bold text-center"> My Audios</Text>
							<Text className="font-bold text-[16px]">Recording your voice here</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient
					// Button Linear Gradient
					colors={['#cf64a6', '#e87717']}
					style={{ borderRadius: 10 }}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate("Notes")}
						className=" rounded-xl p-2 h-[150px] flex flex-row px-4"
					>
						<View>
							<Ionicons name="reader-outline" size={120} color="white" />
						</View>
						<View className="flex justify-start text-center px-6 py-10">
							<Text className="text-2xl text-white font-bold text-center"> My Notes</Text>
							<Text className="font-bold text-[16px]">Recording your notes and tasks</Text>
						</View>
					</TouchableOpacity>
				</LinearGradient>
			</ScrollView>




		</SafeAreaView>
	)
}

export default AppScreen

