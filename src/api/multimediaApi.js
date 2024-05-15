import APIManager from "./ApiManager"

export const postMedia = async (data) => {
	try {
		const response = await APIManager('multimedia', {
			method: 'POST',
			headers: {
				"content-type": "application/json"
			},
			data: data
		})
		console.log('login', response.data)
		return response
	} catch (error) {
		return error.response.data
	}
}