// const base64 = require('base-64');
import { AsyncStorage } from 'react-native';
// import { LoginManager } from 'react-native-fbsdk';

import http from './http.service';
// import notification from './notification.service';

class SessionService {
	constructor() {
		this.isFacebookUser = false;
	}

	facebookLogin(data) {
		return http.post('/facebook-login', JSON.stringify(data))
			.then(token => AsyncStorage.setItem('token', token))
			.then(() => AsyncStorage.getItem('token'))
			.then(token => {
				this.setSession(token);
				this.isFacebookUser = true;
			}).catch(error => Promise.reject(error));
	}

	login(data) {
		return http.post('/login', JSON.stringify(data))
			.then(token => {
				console.log('token:', token)
				return AsyncStorage.setItem('token', token)
			})
			.then(() => AsyncStorage.getItem('token'))
			.then(token => this.setSession(token))
			.catch(error => Promise.reject(error));
	}

	logout() {
		// return http.put('/api/clear-device-token')
		//   .then(() =>
		AsyncStorage.removeItem('token')
			.then(() => {
				if (this.isFacebookUser) LoginManager.logOut();
				this.isFacebookUser = false;
			}).catch(error => Promise.reject(error));
	}

	register(data) {
		return http.post('/register', JSON.stringify(data))
			.then(token => AsyncStorage.setItem('token', token))
			.then(() => AsyncStorage.getItem('token'))
			.then(token => this.setSession(token))
			.catch(error => Promise.reject(error));
	}

	setSession(token) {
		return new Promise((resolve, reject) => {
			try {
				// Set user:
				// payload = JSON.parse(base64.decode(token.split('.')[1].replace('-', '+').replace('_', '/')));
				// this.id = payload.id;

				// Update deviceToken:
				// notification.updateDeviceToken();

				return resolve();
			} catch (error) {
				this.logout();
				return reject('Error encountered while setting session.');
			}
		});
	}
}

export default new SessionService();
