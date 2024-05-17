import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
// import { withNavigation } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context'
import MediaTab from '../components/tab/MediaTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';




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
			<View className="flex flex-row items-center justify-between bg-orange-600 p-1 rounded-lg mb-4">
				<View className="px-2 pt-2 pb-2">
					<Text className="font-bold text-lg text-white">{greeting}</Text>
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
			<ScrollView className="px-2 py-3 gap-4">
				<View className="flex flex-row gap-1">
					<TouchableOpacity onPress={() => navigation.navigate("Videos")} className="bg-orange-600 w-1/2 rounded-xl p-2 h-[150px]">
						<View>
							<Text>Video</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("Photos")} className="bg-orange-600 w-1/2 rounded-xl p-2 h-[150px]">
						<View>
							<Text>Photos</Text>
						</View>
					</TouchableOpacity>

				</View>
				<View className="flex flex-row gap-1">
					<TouchableOpacity onPress={() => navigation.navigate("Audios")} className="bg-orange-600 w-1/2 rounded-xl p-2 h-[150px]">
						<View>
							<Text>Audios</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("Notes")} className="bg-orange-600 w-1/2 rounded-xl p-2 h-[150px]">
						<View>
							<Text>Notes</Text>
						</View>
					</TouchableOpacity>

				</View>
			</ScrollView>




		</SafeAreaView>
	)
}

export default AppScreen