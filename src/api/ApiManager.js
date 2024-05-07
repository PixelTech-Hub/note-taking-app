import axios from "axios";

const couldare_key = 'dgfsgfzee';
export const API_BASE_URL = 'http://localhost:3000';
export const API_CLOUDARE_URL = `https://api.cloudinary.com/v1_1/${couldare_key}/image/upload`;


const APIManager = axios.create({
	baseURL: 'http://localhost:3000',
	responseType: 'json',
	withCredentials: true
})


export default APIManager;