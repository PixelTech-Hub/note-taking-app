import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { useNavigation } from '@react-navigation/native';

const NoteCard = () => {
	const navigation = useNavigation();

	return (
		<View className="mt-4 px-2">



			<View className="mt-4 mx-2 space-y-1">
				<ScrollView
					className="mt-10 px-1 gap-4"
					showsVerticalScrollIndicator={true}

				>

					<View className="flex flex-row justify-between">
						<TouchableOpacity
							className="bg-[#1ecbe1] w-[170px] h-[170px] p-3 rounded-lg"
							onPress={() => navigation.navigate('Video')}
						>
							<View className="flex items-center">
								<Image source={require("../../../assets/video.png")}
									style={{ width: 100, height: 100 }} />
								<Text className="text-white text-lg font-bold">Videos</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							className="bg-[#1ecbe1] w-[170px] h-[170px] p-3 rounded-lg"
							onPress={() => navigation.navigate('Audio')}
						>
							<View className="flex items-center">
								<Image source={require("../../../assets/audio.png")}
									style={{ width: 100, height: 100 }} />
								<Text className="text-white text-lg font-bold">Audio</Text>
							</View>
						</TouchableOpacity>

					</View>
					<View className="flex flex-row justify-between">
						<TouchableOpacity
							className="bg-[#1ecbe1] w-[170px] h-[170px] p-3 rounded-lg"
							onPress={() => navigation.navigate('Photo')}
						>
							<View className="flex items-center">
								<Image source={require("../../../assets/pic.png")}
									style={{ width: 100, height: 100 }} />
								<Text className="text-white text-lg font-bold">Photos</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							className="bg-[#1ecbe1] w-[170px] h-[170px] p-3 rounded-lg"
							onPress={() => navigation.navigate('Document')}
						>
							<View className="flex items-center">
								<Image source={require("../../../assets/doc.png")}
									style={{ width: 100, height: 100 }} />
								<Text className="text-white text-lg font-bold">Document</Text>
							</View>
						</TouchableOpacity>

					</View>

				</ScrollView>
				<ScrollView
					className="mt-10 px-1 gap-4"
					showsVerticalScrollIndicator={true}

				>
					<View className="flex flex-row justify-between">
						<TouchableOpacity
							className="bg-[#1ecbe1] w-[170px] h-[170px] p-3 rounded-lg"
							onPress={() => navigation.navigate('Notes')}
						>
							<View className="flex items-center">
								<Image source={require("../../../assets/doc.png")}
									style={{ width: 100, height: 100 }} />
								<Text className="text-white text-lg font-bold">Notes</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</View>
	)
}

export default NoteCard