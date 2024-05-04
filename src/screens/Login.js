import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
	const navigation = useNavigation()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<View className="flex-1 bg-white">
			<SafeAreaView className="flex ">
				<View className="flex-row justify-start">
					<TouchableOpacity onPress={() => navigation.goBack()}
						className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
						{/* <ArrowLeftIcon size="20" color="black" /> */}
					</TouchableOpacity>
				</View>
				<View className="flex-row justify-center">
					<Image source={require("../../assets/images/login.png")}
						style={{ width: 200, height: 200 }} />
				</View>


			</SafeAreaView>
			<View
				style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
				className="flex-1 bg-white px-8 pt-8">
				<View className="form space-y-2">
					<Text className="text-gray-700 ml-4" >Email Address</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
						textContentType='emailAddress'
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
					<Text className="text-gray-700 ml-4">Password</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
						secureTextEntry
						value={password}
						onChangeText={(text) => setPassword(text)}

					/>

					<TouchableOpacity
						className="py-3 bg-fuchsia-900 rounded-xl"
						onPress={navigation.navigate("Home")}
					>
						<Text
							className="text-xl font-bold text-center text-gray-300"

						>
							Login
						</Text>
					</TouchableOpacity>

				</View>
				<Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>

				<View className="flex-row justify-center mt-7">
					<Text className="text-gray-500 font-semibold">
						Don't have an account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
						<Text className="font-semibold text-fuchsia-900"> Sign Up</Text>
					</TouchableOpacity>
				</View>

			</View>
		</View>
	)
}

export default Login