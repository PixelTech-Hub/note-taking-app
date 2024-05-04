import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
	const navigation = useNavigation()
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
					<Image source={require("../../assets/images/signup.png")}
						style={{ width: 200, height: 200 }} />
				</View>


			</SafeAreaView>
			<View
				style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
				className="flex-1 bg-white px-8 pt-8">
				<View className="form space-y-2">
					<Text className="text-gray-700 ml-4">Full Name:</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
						placeholder="okello john"

					/>
					<Text className="text-gray-700 ml-4">Email Address</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
						placeholder="email"
						value="john@gmail.com"
					/>
					<Text className="text-gray-700 ml-4">Password</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
						secureTextEntry
						placeholder="password"
						value="test12345"
					/>

					<TouchableOpacity
						className="py-3 bg-fuchsia-900 rounded-xl">
						<Text
							className="text-xl font-bold text-center text-gray-300"
						>
							Sign Up
						</Text>
					</TouchableOpacity>

				</View>
				<Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>

				<View className="flex-row justify-center mt-7">
					<Text className="text-gray-500 font-semibold">
						You already have an account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text className="font-semibold text-fuchsia-900">Login</Text>
					</TouchableOpacity>
				</View>

			</View>
		</View>
	)
}

export default SignUp