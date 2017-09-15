import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Sports from '../components/ftue/sports';
import Teams from '../components/ftue/teams';

const Navigator = StackNavigator(
	{
		Sports: { screen: Sports },
		Teams: { screen: Teams }
	},
	{
		cardStyle: { backgroundColor: 'transparent' },
		headerMode: 'none',
		initialRouteName: 'Sports'
	}
);

const FTUENavigator = ({ dispatch, ftueNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: ftueNavigator })} />
);

const mapStateToProps = state => ({
	ftueNavigator: state.ftueNavigator,
});

module.exports = {
	Navigator: Navigator,
	FTUENavigator: connect(mapStateToProps)(FTUENavigator)
};