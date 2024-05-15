import { View, Text, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Uploading from '../components/Uploading'
import { Ionicons } from '@expo/vector-icons'

import { firebase } from '../../firebase'



const AddScreen = () => {
	


	console.log('data media', multimedia)
	const data = multimedia.data;

	return (
		<SafeAreaView className="flex bg-gray-900 h-screen ">
			{isLoading ? (
				<View>
					<Text className="text-white">Loading...</Text>
				</View>
			) : (
				data ? (
					<View className="grid grid-cols-3">
						{data?.map(data => {
							const image = data.link
							return (
								<View key={data.id}>
									<Image
										source={{ uri: image }}
										style={{
											width: 300,
											height: 300,
											resizeMode: "contain",
											borderRadius: 6,
										}}
									/>
								</View>
							)
						})}
					</View>
				) : (
					<View>
						<Text>No data..</Text>
					</View>
				)
			)}



			{image &&
				<View className="flex justify-center items-center">
					<Uploading
						image={image}
						progress={progress}
					/>
				</View>
			}
			<View className="absolute bottom-32 right-4 space-y-4 ">
				<TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"
					onPress={PickImage}
				>
					<Ionicons name="image" size={24} color="white" />
				</TouchableOpacity>
				{/* <TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"

				>
					<Ionicons name="videocam" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					className="flex bg-black p-2 rounded-full justify-center items-center"

				>
					<Ionicons name="audiocam" size={24} color="white" />
				</TouchableOpacity> */}

			</View>

		</SafeAreaView>
	)
}

export default AddScreen