import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';
import VideoRoute from '../VideoRoute';
import AudioRoute from '../AudioRoute';
import PhotoRoute from '../PhotoRoute';
import OtherRoute from '../OtherRoute';




const renderScene = SceneMap({
	video: VideoRoute,
	audio: AudioRoute,
	photos: PhotoRoute,
	others: OtherRoute
});

const MediaTab = () => {
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'video', title: 'Videos' },
		{ key: 'audio', title: 'Audio' },
		{ key: 'photos', title: 'Photos' },
		{ key: 'others', title: 'Others' },
	]);

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			style={{ margin: 0 }}
			
		/>
	)
}

export default MediaTab