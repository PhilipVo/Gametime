import { combineReducers } from 'redux';

import appNavigator from './app-navigator.reducer';
import ftueNavigator from './ftue-navigator.reducer';
import mode from './mode.reducer';
import sports from './sports.reducer';
import tabsNavigator from './tabs-navigator.reducer';

const reducer = combineReducers({
  appNavigator,
  ftueNavigator,
  mode,
  sports,
  tabsNavigator
});

export default reducer;