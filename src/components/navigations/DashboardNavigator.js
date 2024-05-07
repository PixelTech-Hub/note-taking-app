import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../../screens/DashboardScreen'
import VideoScreen from '../../screens/VideoScreen'
import AddVideoScreen from '../../screens/AddVideoScreen'
import { SafeAreaView, Text, View } from 'react-native'


const Stack = createStackNavigator()

const DashboardNavigator = () => {
	const [greeting, setGreeting] = React.useState('');
	// const navigation = useNavigation()


	React.useEffect(() => {

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

		</SafeAreaView>
	)
}

export default DashboardNavigator