import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
	const [greeting, setGreeting] = useState('');
	const navigation = useNavigation()


	useEffect(() => {
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
				{/* Search Icon */}

				{/* Main Content */}
				{/* <NoteCard /> */}
				

			</SafeAreaView>
	)
}