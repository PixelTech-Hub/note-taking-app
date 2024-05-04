import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardScreen from '../../screens/DashboardScreen'
import CustomTabBarButton from '../button/CustomTabBarButton'
import Icon from 'react-native-vector-icons/Ionicons'
import SettingScreen from './SettingScreen'
import AddScreen from '../../screens/AddScreen'
import DashboardNavigator from './DashboardNavigator'


const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
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
					// tabBarShowLabel: true,



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

export default BottomTabNavigator

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