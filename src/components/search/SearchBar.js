import React, { useState } from "react";
import { View, TextInput } from "react-native";

export default function SearchBar({ data, onChange }) {
	const [masterData, setMasterData] = useState(data);
	const search = (text) => {
		if (text) {
			const newData = data.filter((item) => {
				const itemTitle = item.title
					? item.title.toUpperCase()
					: "".toUpperCase();
				const titleSearch = text.toUpperCase();
				return itemTitle.indexOf(titleSearch) > -1;
			});
			onChange(newData);
		} else {
			onChange(masterData);
		}
	};

	return (
		<View className="bg-[#d3d3d3] rounded-lg p-3 px-2" >
			<TextInput
				placeholder="Search Tasks..."
				maxLength={50}
				onChangeText={(text) => search(text)}
				className=""
			/>
		</View>
	);
}
