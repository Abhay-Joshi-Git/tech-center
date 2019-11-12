import axios from 'axios';

export const login = async ({ userName, password }) => {
	const headers = {'Authorization': 'Basic YXBpLWdhdGV3YXk6YXBpLWdhdGV3YXk='};
	const response = await axios.post('/login', { userName, password }, { headers })
	return response.data;
}
