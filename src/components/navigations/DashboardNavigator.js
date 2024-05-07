import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../../screens/DashboardScreen'
import VideoScreen from '../../screens/VideoScreen'
import AddVideoScreen from '../../screens/AddVideoScreen'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'


const Stack = createStackNavigator()

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
			<ScrollView className="gap-0 space-x-1">
				<View className="flex flex-row flex-1">
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
				</View>
				<View className="flex flex-row flex-1">
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
				</View>
				<View className="flex flex-row flex-1">
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
				</View>
				<View className="flex flex-row flex-1">
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
				</View>
				<View className="flex flex-row flex-1">
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
					<Image
						className=""
						source={require('../../../assets/mercy.png')}
						style={{ width: 200, height: 200 }}
					/>
				</View>
			</ScrollView>

		</SafeAreaView>
	)
}

export default DashboardNavigator