import axios from 'axios'

export const checkLogin = async () => {
	try {
		await axios.get('/isloggedin');
		return {
			isLoggedIn: true
		}
	} catch (e) {
		return {
			isLoggedIn: false
		}
	}
}