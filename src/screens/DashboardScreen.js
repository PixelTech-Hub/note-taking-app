import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppScreen from './AppScreen';
import VideoScreen from './VideoScreen';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'


const Stack = createStackNavigator()

export default function DashboardScreen() {

	return (
		<Stack.Navigator >
			<Stack.Screen
				name="App"
				component={AppScreen}
				options={{ headerShown: false }}
			/>


		</Stack.Navigator>

	)
}