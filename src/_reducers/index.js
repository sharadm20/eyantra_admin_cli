import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { apiReducer } from './api.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { notification } from './notification.reducer';

const announcements=apiReducer.announcements;
const registration=apiReducer.registration;

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  notification,
  announcements
});

export default rootReducer;