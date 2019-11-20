import { userConstants } from '../_constants';

export const apiReducer = {
  registration,
  announcements,
  talks,
  labs,
  calendars
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
      return { ...state };
    case userConstants.ANNOUNCEMENT_SUCCESS:
      return { ...state,
        loading:false,
         items: state.items.concat(action.announcement)
        };
    case userConstants.ANNOUNCEMENT_FAILURE:
      return {...state, loading: false};
    case userConstants.ANNOUNCEMENTS_FETCH_REQUEST:
      return { loading: true };
    case userConstants.ANNOUNCEMENTS_FETCH_FAILURE:
        return {};
    case userConstants.ANNOUNCEMENTS_FETCH_SUCCESS:
      return  {items: action.announcements.data, loading: false}; 
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

function talks(state = {}, action) {
  switch (action.type) {
    case userConstants.TALK_REQUEST:
      return { ...state };
    case userConstants.TALK_SUCCESS:
      return { ...state,
        loading:false,
         items: state.items.concat(action.talk)
        };
    case userConstants.TALK_FAILURE:
      return {...state, loading: false};
    case userConstants.TALKS_FETCH_REQUEST:
      return { loading: true };
    case userConstants.TALKS_FETCH_FAILURE:
        return {};
    case userConstants.TALKS_FETCH_SUCCESS:
      return  {items: action.talks.data, loading: false}; 
    case userConstants.EDIT_TALK_REQUEST:
      return { editing: true };
    case userConstants.EDIT_TALK_SUCCESS:
      return {};
    case userConstants.EDIT_TALK_FAILURE:
      return {};
    case userConstants.DELETE_TALK_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(talk =>
          talk.id === action.id
            ? { ...talk, deleting: true }
            : talk
        )
      };
    case userConstants.DELETE_TALK_SUCCESS:
      // remove deleted user from state
      return {
        loading: false,
        items: state.items.filter(talk => talk.id !== action.id)
      };
    case userConstants.DELETE_TALK_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(talk => {
          if (talk.id === action.id) {
            // make copy of talk without 'deleting:true' property
            const { deleting, ...talkCopy } = talk;
            // return copy of user with 'deleteError:[error]' property
            return { ...talkCopy, deleteError: action.error };
          }

          return talk;
        })
      };
    default:
      return state
  }
}

function calendars(state = {}, action) {
  switch (action.type) {
    case userConstants.CALENDAR_REQUEST:
      return { ...state };
    case userConstants.CALENDAR_SUCCESS:
      return { ...state,
        loading:false,
         items: state.items.concat(action.calendar)
        };
    case userConstants.CALENDAR_FAILURE:
      return {...state, loading: false};
    case userConstants.CALENDARS_FETCH_REQUEST:
      return { loading: true };
    case userConstants.CALENDARS_FETCH_FAILURE:
        return {};
    case userConstants.CALENDARS_FETCH_SUCCESS:
      return  {items: action.calendars.data, loading: false}; 
    case userConstants.EDIT_CALENDAR_REQUEST:
      return { editing: true };
    case userConstants.EDIT_CALENDAR_SUCCESS:
      return {};
    case userConstants.EDIT_CALENDAR_FAILURE:
      return {};
    case userConstants.DELETE_CALENDAR_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(calendar =>
          calendar.id === action.id
            ? { ...calendar, deleting: true }
            : calendar
        )
      };
    case userConstants.DELETE_CALENDAR_SUCCESS:
      // remove deleted user from state
      return {
        loading: false,
        items: state.items.filter(calendar => calendar.id !== action.id)
      };
    case userConstants.DELETE_CALENDAR_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(calendar => {
          if (calendar.id === action.id) {
            // make copy of calendar without 'deleting:true' property
            const { deleting, ...calendarCopy } = calendar;
            // return copy of user with 'deleteError:[error]' property
            return { ...calendarCopy, deleteError: action.error };
          }

          return calendar;
        })
      };
    default:
      return state
  }
}

function labs(state = {}, action) {
  switch (action.type) {
    case userConstants.LAB_REQUEST:
      return { ...state };
    case userConstants.LAB_SUCCESS:
      return { ...state,
        loading:false,
         items: state.items.concat(action.lab)
        };
    case userConstants.LAB_FAILURE:
      return {...state, loading: false};
    case userConstants.LABS_FETCH_REQUEST:
      return { loading: true };
    case userConstants.LABS_FETCH_FAILURE:
        return {};
    case userConstants.LABS_FETCH_SUCCESS:
      return  {items: action.labs.data, loading: false}; 
    case userConstants.EDIT_LAB_REQUEST:
      return { editing: true };
    case userConstants.EDIT_LAB_SUCCESS:
      return {};
    case userConstants.EDIT_LAB_FAILURE:
      return {};
    case userConstants.DELETE_LAB_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(lab =>
          lab.id === action.id
            ? { ...lab, deleting: true }
            : lab
        )
      };
    case userConstants.DELETE_LAB_SUCCESS:
      // remove deleted user from state
      return {
        loading: false,
        items: state.items.filter(lab => lab.id !== action.id)
      };
    case userConstants.DELETE_LAB_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(lab => {
          if (lab.id === action.id) {
            // make copy of lab without 'deleting:true' property
            const { deleting, ...labCopy } = lab;
            // return copy of user with 'deleteError:[error]' property
            return { ...labCopy, deleteError: action.error };
          }

          return lab;
        })
      };
    default:
      return state
  }
}