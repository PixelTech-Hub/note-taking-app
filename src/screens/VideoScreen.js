import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ProgressBar from '../components/ProgressBar';
import Uploading from '../components/Uploading';

const VideoScreen = () => {
	const navigation = useNavigation();
	return (
		<View className="flex flex-1  items-center justify-center">

			{/* <View className="flex-row items-center justify-end mx-4 mt-4">
				<TouchableOpacity className="bg-fuchsia-900 p-1 px-4 rounded-md  flex  justify-center items-center" onPress={navigation.navigate("Add")}>
					<Text className="text-xl text-white font-semibold -pb-24">Post</Text>
				</TouchableOpacity>

			</View> */}
			
		</View>
	)
}

export default VideoScreen