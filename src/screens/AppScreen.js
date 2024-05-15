import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import MediaTab from '../components/tab/MediaTab';




const AppScreen = () => {
	const [greeting, setGreeting] = useState("");

	const navigation = useNavigation()

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


	return (
		<SafeAreaView className=" bg-slate-300 flex-1 p-2">
			<View className="flex flex-row items-center justify-between bg-orange-600 p-1 rounded-lg mb-4">
				<View className="px-2 pt-2 pb-2">
					<Text className="font-bold text-lg text-white">{greeting}</Text>
					<Text className="font-bold text-lg text-white">Nathan</Text>
					<Text></Text>
				</View>
				<View className="bg-orange-200 px-4   w-16 h-16 items-center justify-center text-center rounded-full p-1">
					<Text className="font-bold text-white">Nath</Text>
				</View>
			</View>
			{/* <View className="bg-orange-600 p-4 rounded-lg  ">
				<Text className="text-xl text-white text-center font-bold">You are most welcome here</Text>
			</View> */}
			<MediaTab />


			

		</SafeAreaView>
	)
}

export default AppScreen