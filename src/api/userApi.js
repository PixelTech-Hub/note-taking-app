import APIManager from "./ApiManager"

export const userLogin = async (data) => {
	console.log('')
	try {
		const response = await APIManager('/users/auth/login', {
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