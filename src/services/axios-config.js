import axios from 'axios'
import { getToken } from './token'
import { SET_AUTHENTICATION_STATE } from './authentication/types'

let unauthorizedHandler = () => {
	window.location = '/login'
}

// axios.defaults.baseURL = 'https://api.example.com';
axios.interceptors.request.use((config) => {
	const authToken = getToken()
	let updatedConfig = { ...config }
	if (config && config.headers && !config.headers.Authorization && authToken) {
		updatedConfig.headers = {
			...updatedConfig.headers,
			Authorization: 'Bearer ' + authToken
		}
	}
	return updatedConfig;
}, (error) => {
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.status === 401) {
		unauthorizedHandler()
	}
	return Promise.reject(error);
})

export const configureInterceptor = (store) => {
	unauthorizedHandler = () => {
		store.dispatch({
			type: SET_AUTHENTICATION_STATE,
			payload: false
		})
	}
}
