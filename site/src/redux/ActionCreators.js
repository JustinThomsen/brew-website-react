import * as ActionTypes from './ActionTypes';

import {baseUrl} from "../shared/baseUrl";

export const fetchBeverages = () => (dispatch) => {
    dispatch(beveragesLoading(true));

    return fetch(baseUrl + 'beverages')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(beverages => dispatch(addBeverages(beverages)))
        .catch(error => dispatch(beveragesFailed(error.message)));
};

export const beveragesLoading = () => ({
    type: ActionTypes.BEVERAGES_LOADING
});

export const beveragesFailed = (errMess) => ({
    type: ActionTypes.BEVERAGES_FAILED,
    payload: errMess
});

export const addBeverages = (beverages) => ({
    type: ActionTypes.ADD_BEVERAGES,
    payload: beverages
});

export const fetchAnkenyBeverages = () => (dispatch) => {
    dispatch(locationLoading(true));


    return fetch(baseUrl + 'ankeny')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(location => dispatch(addAnkeny(location)))
        .catch(error => dispatch(locationFailed(error.message)));
};

export const fetchBettendorfBeverages = () => (dispatch) => {
    dispatch(locationLoading(true));

    return fetch(baseUrl + 'bettendorf')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(location => dispatch(addLocation(location)))
        .catch(error => dispatch(locationFailed(error.message)));
};

export const locationLoading = () => ({
    type: ActionTypes.LOCATION_LOADING
});

export const locationFailed = (errMess) => ({
    type: ActionTypes.LOCATION_FAILED,
    payload: errMess
});

export const addLocation = (location) => ({
    type: ActionTypes.ADD_LOCATION,
    payload: location
});
export const addAnkeny = (location) => ({
    type: ActionTypes.ADD_ANKENY,
    payload: location
});


