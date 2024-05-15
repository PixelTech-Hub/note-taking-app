import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = () => {

	const navigation = useNavigation()

	useEffect(() => {
		setTimeout(() => {
			// handleGetToken()
			navigation.navigate("Home")
		}, 2000)
	})
	const handleGetToken = async () => {
		const dataToken = await AsyncStorage.getItem("accessToken")
		if (!dataToken) {
			navigation.navigate("Login")
		}
		else {
			navigation.navigate("Home")
		}
	}
	return (
		<SafeAreaView className="relative flex-1 bg-white" >
			<View className="flex-1 flex justify-around my-4">

				<View className="flex-row justify-center">
					<Image source={require("../../assets/images/welcome.png")}
						style={{ width: 350, height: 350 }} />
				</View>

			</View>
		</SafeAreaView>
	)
}

export default SplashScreen