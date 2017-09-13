import { NavigationActions } from 'react-navigation';

import { Navigator } from '../navigators/tab.navigator';
const initialNavState = Navigator.router.getStateForAction(
	NavigationActions.init()
);

const tabNavigator = (state = initialNavState, action) => {
	let nextState;
	switch (action.type) {
		case 'Add':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Add' }),
				state
			);
			break;
		case 'Feed':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Feed' }),
				state
			);
			break;
		case 'Manage':
			nextState = Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Manage' }),
				state
			);
			break;
		default:
			nextState = Navigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

export default tabNavigator;