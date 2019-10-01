import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { apiReducer } from './api.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { notification } from './notification.reducer';

const { registration, announcements, calendar, talks, labs }=apiReducer;


const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  notification,
  announcements,
  calendar,
  labs,
  talks
});

export default rootReducer;