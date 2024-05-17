import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ item, navigation }) => {
	const [status, setStatus] = useState(false)
	return (
		<View className="py-2">
			<Video

				className="h-[200px] object-cover items-center rounded-lg"
				source={{
					uri: item
				}}
				useNativeControls
				resizeMode={ResizeMode.COVER}
				isLooping
				onPlaybackStatusUpdate={status => setStatus(() => status)}
			/>
		</View >
	)
}

export default VideoCard