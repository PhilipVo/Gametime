import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';

import Add from '../components/add';
import Feed from '../components/feed';
import Manage from '../components/manage';

export const Navigator = TabNavigator(
	{
		Add: { screen: Add },
		Feed: { screen: Feed },
		Manage: { screen: Manage },
	},
	{
		headerMode: 'none',
		initialRouteName: 'Feed',
		// navigationOptions: { tabBarVisible: false }
	}
);

const _TabNavigator = ({ dispatch, tabNavigator }) => (
	<Navigator navigation={addNavigationHelpers({ dispatch, state: tabNavigator })} />
);

const mapStateToProps = state => ({
	tabNavigator: state.tabNavigator,
});

export default connect(mapStateToProps)(_TabNavigator);