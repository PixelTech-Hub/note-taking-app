import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const UserCard = ({ item, navigation }) => {
	console.log(item)
	return (
		<View className="flex ">
			<TouchableOpacity onPress={() => setOpenShare(!openShare)}>
				<Text className="text-sm">
					{item.name}
				</Text>
			</TouchableOpacity>

		</View>
	)
}

export default UserCard