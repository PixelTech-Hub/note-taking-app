import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Rect } from 'react-native-svg'

const ProgressBar = ({ progress }) => {
	const barWidth = 180;
	const progressWidth = (progress / 100) * barWidth
	return (
		<View>
			<Svg width={barWidth} height="7">
				<Rect
					width={barWidth}
					height="100%"
					fill="#fff"
					rx={3.5}
					ry={3.5}
				/>
				<Rect
					width={progressWidth}
					height="100%"
					fill="#1ecbe1"
					rx={3.5}
					ry={3.5}
				/>
			</Svg>
		</View>
	)
}

export default ProgressBar