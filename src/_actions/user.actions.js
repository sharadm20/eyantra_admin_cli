import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    notification,
    notificationToTopic,
    addAnnouncementImage,
    addAnnouncementText,
    getAllAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
    userService.logout();
    dispatch(alertActions.error("User is logout"));
    return { type: userConstants.LOGOUT };
    };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
function notification(title, message, fcm_token, screen) {
    return dispatch => {
        dispatch(request());

        userService.notification(title, message, fcm_token, screen)
            .then(
                res => { 
                    dispatch(success(res));
                    dispatch(alertActions.success(res.message));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.NOTIFICATION_REQUEST} }
    function success(res) { return { type: userConstants.NOTIFICATION_SUCCESS, res } }
    function failure(error) { return { type: userConstants.NOTIFICATION_FAILURE, error } }
}

function notificationToTopic(title, message, topic) {
    return dispatch => {
        dispatch(request());

        userService.notificationToTopic(title, message, topic)
            .then(
                res => { 
                    dispatch(success(res));
                    dispatch(alertActions.success(res.message));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.NOTIFICATION_REQUEST} }
    function success(res) { return { type: userConstants.NOTIFICATION_SUCCESS, res } }
    function failure(error) { return { type: userConstants.NOTIFICATION_FAILURE, error } }
}

function addAnnouncementText(title, body, color, textColor, type, subText) {
    return dispatch => {
        dispatch(request());

        userService.addAnnouncementText(title, body, color, textColor, type, subText)
            .then(
                res => { 
                    dispatch(success(res));
                    dispatch(alertActions.success(res.message));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.ANNOUNCEMENT_REQUEST} }
    function success(res) { return { type: userConstants.ANNOUNCEMENT_SUCCESS, res } }
    function failure(error) { return { type: userConstants.ANNOUNCEMENT_FAILURE, error } }
}

function addAnnouncementImage(title, body, imageUrl, type, subText) {
    return dispatch => {
        dispatch(request());

        userService.addAnnouncementImage(title, body, imageUrl, type, subText)
            .then(
                res => { 
                    dispatch(success(res));
                    dispatch(alertActions.success(res.message));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.ANNOUNCEMENT_REQUEST} }
    function success(res) { return { type: userConstants.ANNOUNCEMENT_SUCCESS, res } }
    function failure(error) { return { type: userConstants.ANNOUNCEMENT_FAILURE, error } }
}

function editAnnouncement(announcement) {
    return dispatch => {
        dispatch(request());

        userService.editAnnouncement(announcement)
            .then(
                res => { 
                    dispatch(success(res));
                    dispatch(alertActions.success(res.message));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.EDIT_ANNOUNCEMENT_REQUEST} }
    function success(res) { return { type: userConstants.EDIT_ANNOUNCEMENT_SUCCESS, res } }
    function failure(error) { return { type: userConstants.EDIT_ANNOUNCEMENT_FAILURE, error } }
}

function getAllAnnouncement() {
    return dispatch => {
        dispatch(request());

        userService.getAllAnnouncement()
            .then(
                announcements => { 
                    dispatch(success(announcements));
                    history.push('/announcement');
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.ANNOUNCEMENT_REQUEST} }
    function success(announcements) { return { type: userConstants.ANNOUNCEMENTS_FETCH_SUCCESS, announcements } }
    function failure(error) { return { type: userConstants.ANNOUNCEMENT_FAILURE, error } }
}
function deleteAnnouncement(id) {
    return dispatch => {
        dispatch(request(id));

        userService.deleteAnnouncement(id)
            .then(
                res => dispatch(success(res.data)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_ANNOUNCEMENT_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_ANNOUNCEMENT_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_ANNOUNCEMENT_FAILURE, id, error } }
}