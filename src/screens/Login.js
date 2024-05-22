import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { userLogin } from '../api/userApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [seePassword, setSeePassword] = useState(true)
	const [checkValidEmail, setCheckValidEmail] = useState(false)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const navigation = useNavigation()

	useEffect(() => {
		checkLoginStatus();
	}, []);

	const checkLoginStatus = async () => {

		try {
			const accessToken = await AsyncStorage.getItem('accessToken');
			if (accessToken) {
				// User is already authenticated, navigate to the home screen
				navigation.navigate('Home');

			}
		} catch (error) {
			console.error('Error checking login status:', error);
		}
	};

	const handleLogin = async () => {
		console.log('processing user:');
		setLoading(true)
		try {
			const response = await axios.post('https://note-taking-app-p5rt.onrender.com/users/auth/login', {
				email: email,
				password: password
			});

			console.log('login data:')

			if (response.status === 201) {
				const accessToken = response?.data?.accessToken;
				const username = response.data?.data?.name;
				const userId = response.data?.data?.id;
				AsyncStorage.setItem("accessToken", accessToken.toString());
				AsyncStorage.setItem("name", username);
				AsyncStorage.setItem("userId", userId);
				console.log('Login Success', response?.data?.data?.name);
				Alert.alert("Login Success!");
				navigation.navigate("Home");
				setLoading(false)
			} else {
				console.error('Login failed:', response.data);
				// Handle login failure, show error message, etc.
				setLoading(false)
			}
		} catch (error) {
			console.error('Error during login:', error);
			setLoading(false)
			// Handle network errors, etc.
		}
	};

	return (
		<View className="flex-1 bg-white h-screen">
			<SafeAreaView className="flex ">

				<View className="flex-row justify-center">
					<Image source={require("../../assets/images/login.png")}
						style={{ width: 400, height: 300 }} />
				</View>


			</SafeAreaView>
			<View
				style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
				className="flex-1 bg-white px-8 pt-8">
				<View className="form space-y-2">
					<Text className="text-gray-700 ml-4" >Email Address</Text>
					<TextInput
						className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 lowercase"
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
						className="py-3 bg-[#e87717] rounded-xl"
						onPress={handleLogin}
					>
						<Text
							className="text-xl font-bold text-center text-white"

						>
							{loading ? 'Processing...' : 'Login'}
						</Text>
					</TouchableOpacity>

				</View>
				<Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>

				<View className="flex-row justify-center mt-7">
					<Text className="text-gray-500 font-semibold">
						Don't have an account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
						<Text className="font-semibold text-[#e87717]"> Sign Up</Text>
					</TouchableOpacity>
				</View>

			</View>
		</View>
	)
}

export default Login