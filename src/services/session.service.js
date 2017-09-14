const base64 = require('base-64');
import { AsyncStorage } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';

import http from './http.service';
import notification from './notification.service';

class SessionService {
  constructor() {
    this.id;
  }

  facebookLogin(data) {
    return http.post('/users/facebook-login', JSON.stringify(data))
      .then(token => {
        if (token.isNew) throw { isNew: true };
        AsyncStorage.setItem('token', token);
      }).then(() => AsyncStorage.getItem('token'))
      .then(token => this.setSession(token))
      .catch(error => error.isNew ? Promise.resolve(true) : Promise.reject(error));
  }

  facebookRegister(data) {
    return http.post('/users/facebook-register', JSON.stringify(data))
      .then(token => AsyncStorage.setItem('token', token))
      .then(() => AsyncStorage.getItem('token'))
      .then(token => {
        this.setSession(token);
        this.isFacebookUser = true;
      }).catch(error => Promise.reject(error));
  }

  login(data) {
    return http.post('/users/login', JSON.stringify(data))
      .then(token => AsyncStorage.setItem('token', token))
      .then(() => AsyncStorage.getItem('token'))
      .then(token => this.setSession(token))
      .catch(error => Promise.reject(error));
  }

  logout() {
    return http.put('/api/users/clear-device-token')
      .then(() => AsyncStorage.removeItem('token'))
      .then(() => {
        if (this.isFacebookUser) LoginManager.logOut();
        this.id = undefined;
      }).catch(error => Promise.reject(error));
  }

  register(data) {
    return http.post('/users/register', JSON.stringify(data))
      .then(token => AsyncStorage.setItem('token', token))
      .then(() => AsyncStorage.getItem('token'))
      .then(token => this.setSession(token))
      .catch(error => Promise.reject(error));
  }

  setSession(token) {
    return new Promise((resolve, reject) => {
      try {
        // Set user:
        payload = JSON.parse(base64.decode(token.split('.')[1].replace('-', '+').replace('_', '/')));
        this.id = payload.id;

        // Update deviceToken:
        notification.updateDeviceToken();

        return resolve();
      } catch (error) {
        this.logout();
        return reject('Error encountered while setting session.');
      }
    });
  }
}

export default new SessionService();
