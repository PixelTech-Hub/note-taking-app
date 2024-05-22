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

	console.log(data)
	return (
		<View className="bg-[#e87717] rounded-lg p-3 px-2" >
			<TextInput
				placeholder="Search Tasks..."
				maxLength={50}
				onChangeText={(text) => search(text)}
				placeholderTextColor="#fff"
				className="text-lg"

			/>
		</View>
	);
}
