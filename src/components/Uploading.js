import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Video } from 'expo-av'
import ProgressBar from './ProgressBar'

const Uploading = ({ image, video, progress }) => {
	return (
		<View className="  flex items-center justify-center z-1">

			<View className="bg-black/60 flex items-center  rounded-lg" style={{ width: 200, paddingVertical: 16, rowGap: 12 }}>
				{image && (
					<Image
						source={{ uri: image }}
						style={{
							width: 100,
							height: 100,
							resizeMode: "contain",
							borderRadius: 6,
						}}
					/>
				)}
				{video && (
					<Video
						source={{ uri: video }}
						videoStyle={{}}
						rate={1.0}
						volume={1.0}
						isMuted={false}
						resizeMode='contain'
						style={{
							width: "80%",
							height: "80%"
						}}
						useNativeControls

					/>
				)}
				<Text className="text-lg text-white">Uploading...</Text>
				<ProgressBar progress={progress} />
				<View className="border-t w-full border-gray-300">
					<TouchableOpacity className="">
						<Text style={{ fontWeight: "500", fontSize: 17 }} className="text-red-500 text-center pt-4">Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default Uploading