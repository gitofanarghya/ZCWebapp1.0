import { combineReducers } from 'redux';

import { authentication } from './users.reducer';
import { alert } from './alert.reducer';
import { dashBoard } from './dashBoard.reducer'
import { control } from './control.reducer'
import { commissioning } from './commissioning.reducer'
import { trends } from './trends.reducer'
import { settings } from './settings.reducer'
import { homePage } from './homePage.reducer'

const rootReducer = combineReducers({
  authentication,
  alert,
  commissioning,
  control,
  dashBoard,
  trends,
  settings,
  homePage
});

export default rootReducer;