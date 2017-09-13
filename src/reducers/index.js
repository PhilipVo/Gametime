import { combineReducers } from 'redux';

import appNavigator from './app-navigator.reducer';
import session from './session.reducer';
import teams from './teams.reducer';

const reducer = combineReducers({
  appNavigator,
  session,
  teams
});

export default reducer;