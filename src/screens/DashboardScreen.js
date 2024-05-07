import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardNavigator from '../components/navigations/DashboardNavigator';
import AddScreen from './AddScreen';
import SettingScreen from '../components/navigations/SettingScreen';
import CustomTabBarButton from '../components/button/CustomTabBarButton';
import Icon from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator()

export default function DashboardScreen() {
	const navigation = useNavigation()

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: styles.tabBarStyle,
				tabBarActiveTintColor: '#fff',
				tabBarInactiveTintColor: '#000',
				tabBarIcon: ({ color, size, focused }) => {
					let iconName = ''
					if (route.name === 'App') {
						iconName = focused ? 'home' : 'home'
					}
					else if (route.name === 'Add') {
						iconName = focused ? 'add-outline' : 'add-outline'
					}
					else if (route.name === 'Settings') {
						iconName = focused ? 'person-outline' : 'person-outline'
					}
					return (
						<Icon name={iconName} color={color} size={25} />
					)
				}
			})}
		>
			<Tab.Screen
				name='App'
				component={DashboardNavigator}
				options={{
					// tabBarLabel: '',
					// tabBarShowLabel: true

					tabBarButton: props => <CustomTabBarButton {...props} />
				}}

			/>
			<Tab.Screen
				name='Add'
				component={AddScreen}

				options={{
					tabBarButton: props => <CustomTabBarButton {...props} iconName="add" />
				}}
			/>
			<Tab.Screen
				name='Settings'
				component={SettingScreen}
				options={{
					// tabBarLabel: 'Person',
					// tabBarShowLabel: true,
					tabBarButton: props => <CustomTabBarButton {...props} />
				}}
			/>
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({
	tabBarStyle: {
		// position: 'absolute',
		backgroundColor: '#1ecbe1',
		// borderTopWidth: 2,
		// bottom: 50,

		// padding: -20,
		// paddingTop: 13,
		// borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	}
})