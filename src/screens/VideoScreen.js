import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler';
import { Video } from 'expo-av';

const VideoScreen = () => {
	const navigation = useNavigation();
	return (
		<View className="flex flex-1  items-center justify-center">

			<View className="flex-row items-center justify-end mx-4 mt-4">
				<TouchableOpacity className="bg-fuchsia-900 p-1 px-4 rounded-md  flex  justify-center items-center" >
					<Text className="text-xl text-white font-semibold -pb-24">Post</Text>
				</TouchableOpacity>

			</View>

			<FlatList
				ItemSeparatorComponent={() => <View className="pt-2" />}
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

export default VideoScreen