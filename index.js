import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './src/components/app';
import reducer from './src/reducers';

const store = createStore(reducer);

export default class Gametime extends Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

AppRegistry.registerComponent('Gametime', () => Gametime);