import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { userLogin } from '../api/userApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [seePassword, setSeePassword] = useState(true)
	const [checkValidEmail, setCheckValidEmail] = useState(false)

	const navigation = useNavigation()


	const handleCheckEmail = (text) => {
		let re = /\S+0\S+\.\S+/;
		let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		setEmail(text)
		if (re.test(text) || regex.test(text)) {
			setCheckValidEmail(false)
		}
		else {
			setCheckValidEmail(true)
		}
	}

	const checkPasswordValidity = (value) => {
		const isNonWhiteSpace = /^\S*$/;
		const isContainUppercase = /^(?=.*[A-Z]).*$/;
		const isContainLowercase = /^(?=.*[a-z]).*$/;
		const isValidLength = /^.{8,16}$/;
		if (!isNonWhiteSpace.test(value)) {
			return 'Password must not contain empty space'
		}
		if (!isContainUppercase.test(value)) {
			return 'Password must have atleast one uppercase'
		}
		if (!isContainLowercase.test(value)) {
			return 'Password must have atleast one lowercase'
		}
		if (!isValidLength.test(value)) {
			return 'Password must have atleast 8 characters'
		}
		return null;
	}

	const handleLogin = () => {
		userLogin({
			email: email,
			password: password
		}).then(result => {
			if (result.status === 201) {
				const accessToken = result.data.accessToken; // Assuming accessToken is the key for the access token in the response
				AsyncStorage.setItem("accessToken", accessToken.toString()); // Convert to string before setting
				console.log('Login Success');
				Alert.alert("Login Success!");
				navigation.navigate("Home");
			}
		}).catch(error => {
			console.error(error);
		});
	};

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
						onPress={handleLogin}
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