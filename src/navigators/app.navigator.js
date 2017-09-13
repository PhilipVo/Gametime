import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Login from '../components/login';

export const Navigator = StackNavigator(
	{
		Login: { screen: Login },
	},
	{
		headerMode: 'none',
		initialRouteName: 'Login'
	}
);

const AppNavigator = ({ dispatch, appNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: appNavigator })} />
);

const mapStateToProps = state => ({
	appNavigator: state.appNavigator,
});

export default connect(mapStateToProps)(AppNavigator);