import axios from 'axios';

export const login = async ({ userName, password }) => {
	const response = await axios.post('/login', { userName, password })
	return response.data;
}
