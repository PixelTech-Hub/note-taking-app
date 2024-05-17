import { View, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const SignUp = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const navigation = useNavigation()


	const handleSignUp = async () => {
		console.log('processing new user:');

		try {
			setLoading(true)
			const response = await axios.post('https://note-taking-app-p5rt.onrender.com/users/auth/signup', {
				name: name,
				email: email,
				password: password
			});

			console.log('sign data:', response.status)

			// if (response.status === 200) {

			Alert.alert("Account Activated!😊");
			navigation.navigate("Login");
			setLoading(false)
			// } else {
			// 	console.error('SignUp failed:', response?.data);
			// 	// Handle login failure, show error message, etc.
			// 	setLoading(false)
			// }
		} catch (error) {
			console.error('Error during signup:', error);
			setLoading(false)
			// Handle network errors, etc.
		}
	};
	return (
		<View className="flex-1 bg-white">
			<SafeAreaView className="flex ">
				<View className="flex-row justify-center">
					<Image source={require("../../assets/images/signup.png")}
						style={{ width: 400, height: 300 }} />
				</View>


			</SafeAreaView>
			<View
				style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
				className="flex-1 bg-white px-8 pt-8">
				<View className="form space-y-2">
					<Text className="text-gray-700 ml-4">Full Name:</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
						placeholder=""
						value={name}
						onChangeText={(text) => setName(text)}

					/>
					<Text className="text-gray-700 ml-4">Email Address</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 lowercase"
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
					<Text className="text-gray-700 ml-4">Password</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl "
						secureTextEntry
						value={password}
						onChangeText={(text) => setPassword(text)}
					/>

					<TouchableOpacity
						className="py-3 bg-[#e87717] rounded-xl"
						onPress={handleSignUp}
					>
						<Text
							className="text-xl font-bold text-center text-gray-300"
						>
							{loading ? 'Processing...' : 'Sign Up'}
						</Text>
					</TouchableOpacity>

				</View>
				<Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>

				<View className="flex-row justify-center mt-7">
					<Text className="text-gray-500 font-semibold">
						You already have an account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text className="font-semibold text-[#e87717]">Login</Text>
					</TouchableOpacity>
				</View>

			</View>
		</View>
	)
}

export default SignUp