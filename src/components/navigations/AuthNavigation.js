import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../../screens/SplashScreen'
import Login from '../../screens/Login'
import SignUp from '../../screens/SignUp'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createStackNavigator()

const AuthNavigation = () => {
	let user = {
		name: 'Okello',
		email: 'okello@gmail.com',
		password: 'jon1234'
	}
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>

			{!user === null ? <>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SignUp"
					component={SignUp}
					options={{ headerShown: false }}
				/>
			</> : (
				<Stack.Screen
					name="Home"
					component={BottomTabNavigator}
					options={{ headerShown: false }}
				/>
			)}





		</Stack.Navigator>
	)
}

export default AuthNavigation