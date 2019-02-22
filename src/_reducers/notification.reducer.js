import { userConstants } from '../_constants';

export function notification(state = {}, action) {
  switch (action.type) {
    case userConstants.NOTIFICATION_REQUEST:
        return {
            loading: true,
        };
    case userConstants.NOTIFICATION_SUCCESS:
        return {
            loading: false,
            message: action.res.data
        };
    case userConstants.NOTIFICATION_FAILURE:
        return {};
  
    default:
    return state
  }
}