import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ResizeMode, Video } from 'expo-av'
import { videos } from '../data/data'
import { Button } from 'react-native'

const VideoRoute = () => {
	const video = React.useRef(null);
	const [status, setStatus] = React.useState({});
	return (
		<View className=" flex-1">
			<FlatList
				ItemSeparatorComponent={() => <View className="pt-4" />}
				data={videos ? videos : []}
				keyExtractor={(item, index) => `${index}`}
				renderItem={(item, index) => {
					return (
						<View className="relative bg-gray-400 mx-2  p-2 rounded-md" key={index + item}>
							<Video
								ref={video}
								// style={styles.video}
								className="w-full h-[200px] object-cover items-center"
								source={{
									uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
								}}
								useNativeControls
								resizeMode={ResizeMode.CONTAIN}
								isLooping
								onPlaybackStatusUpdate={status => setStatus(() => status)}
							/>

							<View className="absolute left-0 right-0 bottom-24">
								<View style={styles.buttons}>
									<Button
										title={status.isPlaying ? '' : 'Bunny Bust'}

										onPress={() =>
											status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
										}
									/>
								</View>
							</View>
						</View>
					)
				}}

			/>
		</View>
	)
}

export default VideoRoute


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
	},
	video: {
		alignSelf: 'center',
		width: 320,
		height: 200,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#000'
	},
});