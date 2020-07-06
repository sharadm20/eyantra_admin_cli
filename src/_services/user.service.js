import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    notification,
    notificationToTopic,
    addAnnouncementImage,
    addAnnouncementText,
    getAllAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
    getAllCalendar,
    addCalendar,
    getAllLab,
    addLab,
    getAllTalk,
    addTalk,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
         mode: 'cors',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
         mode: 'cors',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
         mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
         mode: 'cors',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function notification(title, message, fcm_token, screen) {
    const requestOptions = {
        method: 'POST',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({title, message, screen})
    };
    return fetch(`${config.apiUrl}/notifications/send?_token=${fcm_token}`, requestOptions).then(handleResponse);
}

function notificationToTopic(title, message, topic, screen) {
    const requestOptions = {
        method: 'POST',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({title, message, screen})
    };
    return fetch(`${config.apiUrl}/notifications/send?_topic=${topic}`, requestOptions).then(handleResponse);
}

function addAnnouncementText(title, body, color, textColor, type, subText) {
    const requestOptions = {
        method: 'POST',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({title, body, color, textColor, type, subText})
    };
    return fetch(`${config.apiUrl}/announce`, requestOptions).then(handleResponse);
}

function addAnnouncementImage(title, body, imageUrl, type, subText) {
    const requestOptions = {
        method: 'POST',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({title, body, imageUrl, type, subText})
    };
    return fetch(`${config.apiUrl}/announce`, requestOptions).then(handleResponse);
}
function editAnnouncement(announcement) {
   
        const requestOptions = {
            method: 'PUT',
             mode: 'cors',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(announcement)
        };
        return fetch(`${config.apiUrl}/announce`, requestOptions).then(handleResponse);
    
}

function getAllAnnouncement() {
    const requestOptions = {
        method: 'GET',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${config.apiUrl}/announce/all`, requestOptions).then(handleResponse);
}

function deleteAnnouncement(id) {
    const requestOptions = {
        method: 'DELETE',
         mode: 'cors',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/announce/${id}`, requestOptions).then(handleResponse);
}

function getAllCalendar() {
    const requestOptions = {
        method: 'GET',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${config.apiUrl}/calendars`, requestOptions).then(handleResponse);
}

function addCalendar(event, date, description, location){
    const requestOptions = {
        method: 'POST',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({event, date, description, location})
    };
    return fetch(`${config.apiUrl}/calendars`, requestOptions).then(handleResponse);
}

function getAllLab() {
    const requestOptions = {
        method: 'GET',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${config.apiUrl}/labs`, requestOptions).then(handleResponse);
}
function addLab(lab){
    const requestOptions = {
        method: 'POST',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(lab)
    };
    return fetch(`${config.apiUrl}/labs`, requestOptions).then(handleResponse);
}
function getAllTalk() {
    const requestOptions = {
        method: 'GET',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${config.apiUrl}/talks`, requestOptions).then(handleResponse);
}

function addTalk(talk){
    const requestOptions = {
        method: 'POST',
         mode: 'cors',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(talk)
    };
    return fetch(`${config.apiUrl}/talks`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        
        return data;
    });
}