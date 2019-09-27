import { userConstants } from '../_constants';

export const apiReducer = {
  registration,
  announcements,
  talk,
  lab,
  calendar
};

function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

function announcements(state = {}, action) {
  switch (action.type) {
    case userConstants.ANNOUNCEMENT_REQUEST:
      return { loading: true };
    case userConstants.ANNOUNCEMENT_SUCCESS:
      return {};
      case userConstants.ANNOUNCEMENTS_FETCH_SUCCESS:
        // console.log('here')
      return  {items: action.announcements.data, loading: false};
    case userConstants.ANNOUNCEMENT_FAILURE:
      return {};
      case userConstants.EDIT_ANNOUNCEMENT_REQUEST:
      return { editing: true };
    case userConstants.EDIT_ANNOUNCEMENT_SUCCESS:
      return {};
    case userConstants.EDIT_ANNOUNCEMENT_FAILURE:
      return {};
      case userConstants.DELETE_ANNOUNCEMENT_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(announcement =>
          announcement.id === action.id
            ? { ...announcement, deleting: true }
            : announcement
        )
      };
    case userConstants.DELETE_ANNOUNCEMENT_SUCCESS:
      // remove deleted user from state
      console.log(action.id)
      return {
        loading: false,
        items: state.items.filter(announcement => announcement.id !== action.id)
      };
    case userConstants.DELETE_ANNOUNCEMENT_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(announcement => {
          if (announcement.id === action.id) {
            // make copy of announcement without 'deleting:true' property
            const { deleting, ...announcementCopy } = announcement;
            // return copy of user with 'deleteError:[error]' property
            return { ...announcementCopy, deleteError: action.error };
          }

          return announcement;
        })
      };
    default:
      return state
  }
}

function calendar(state = {}, action) {
  switch (action.type) {
    case userConstants.CALENDAR_REQUEST:
      return { loading: true };
    case userConstants.CALENDAR_SUCCESS:
      return {};
    case userConstants.CALENDAR_FAILURE:
      return {};
    default:
      return state
  }
}

function talk(state = {}, action) {
  switch (action.type) {
    case userConstants.LAB_REQUEST:
      return { loading: true };
    case userConstants.LAB_SUCCESS:
      return {};
    case userConstants.LAB_FAILURE:
      return {};
    default:
      return state
  }
}

function lab(state = {}, action) {
  switch (action.type) {
    case userConstants.TALK_REQUEST:
      return { loading: true };
    case userConstants.TALK_SUCCESS:
      return {};
    case userConstants.TALK_FAILURE:
      return {};
    default:
      return state
  }
}