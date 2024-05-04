import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../../screens/DashboardScreen'
import VideoScreen from '../../screens/VideoScreen'
import AddVideoScreen from '../../screens/AddVideoScreen'


const Stack = createStackNavigator()

const DashboardNavigator = () => {
	return (
		<Stack.Navigator >
			<Stack.Screen name="Dashboard" component={DashboardScreen} options={{
				headerShown: false
			}} />
			<Stack.Screen
				name="Video"
				component={VideoScreen}
				options={{
					title: ""
				}}
			/>
			{/* <Stack.Screen
				name="Audio"
				component={AudioScreen}
				options={{
					title: ""
				}}
			/>
			<Stack.Screen
				name="Photo"
				component={PhotoScreen}
				options={{
					title: ""
				}}
			/>
			<Stack.Screen
				name="Document"
				component={DocumentScreen}
				options={{
					title: ""
				}}
			/>
			<Stack.Screen
				name="Notes"
				component={NotesScreen}
				options={{
					title: ""
				}}
			/> */}
			{/* <Stack.Screen name="Setting" component={SettingScreen} />
			<Stack.Screen name="Add" component={AddScreen} /> */}

		</Stack.Navigator>
	)
}

export default DashboardNavigator