import { View, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomTabBarButton = ({ children, accessibilityState, onPress }) => {
	const { selected } = accessibilityState;

	if (selected) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<TouchableOpacity onPress={onPress} style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', width: 60, height: 80, borderRadius: 50 }}>
					{children}
				</TouchableOpacity>
			</View>
		);
	} else {
		return (
			<TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				{children}
			</TouchableOpacity>
		);
	}
};

export default CustomTabBarButton;
