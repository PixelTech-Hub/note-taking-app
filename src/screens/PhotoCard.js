import React, { useState } from 'react';
import { View, Text, Image, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const PhotoCard = ({ item }) => {
	const [modalVisible, setModalVisible] = useState(true);

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.container}>

			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<Image
					source={{ uri: item }}
					className="h-[300px] w-full"
				/>
			</View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeModal}
			>
				<TouchableOpacity onPress={closeModal} style={styles.modalContainer}>
					<Image source={{ uri: item }} style={styles.modalImage} resizeMode="contain" />
					<View style={styles.closeButton}>
						<Text style={styles.closeText}>Close</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 5,
		alignItems: 'center',
	},
	image: {
		width: width / 3 - 10,
		height: width / 3 - 10,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
	},
	modalImage: {
		width: width,
		height: height,
	},
	closeButton: {
		position: 'absolute',
		top: 20,
		right: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		padding: 10,
		borderRadius: 5,
	},
	closeText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default PhotoCard;
