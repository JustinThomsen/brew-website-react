import * as ActionTypes from './ActionTypes';

export const addBeverages = (beverages) => ({
  type: ActionTypes.ADD_BEVERAGES,
  payload: beverages,
});

export const beveragesLoading = () => ({
  type: ActionTypes.BEVERAGES_LOADING,
});

export const beveragesFailed = (errMess) => ({
  type: ActionTypes.BEVERAGES_FAILED,
  payload: errMess,
});

export const addAnkeny = (location) => ({
  type: ActionTypes.ADD_ANKENY,
  payload: location,
});

export const addLocation = (location) => ({
  type: ActionTypes.ADD_LOCATION,
  payload: location,
});

export const locationLoading = () => ({
  type: ActionTypes.LOCATION_LOADING,
});

export const locationFailed = (errMess) => ({
  type: ActionTypes.LOCATION_FAILED,
  payload: errMess,
});

export const updateTaps = (update) => ({
  type: ActionTypes.UPDATE_TAPS,
  payload: update,
});

export const updateLoading = () => ({
  type: ActionTypes.UPDATE_LOADING,
});

export const updateFailed = (errMess) => ({
  type: ActionTypes.UPDATE_FAILED,
  payload: errMess,
});

export const fetchBeverages = () => (dispatch) => {
  dispatch(beveragesLoading(true));
  return fetch('api/beverages')
    .then((response) => response.json())
    .then((beverages) => dispatch(addBeverages(beverages)))
    .catch((error) => dispatch(beveragesFailed(error.message)));
};

export const fetchAnkenyBeverages = () => (dispatch) => {
  dispatch(locationLoading(true));

  return fetch('/api/ankeny')
    .then((response) => response.json())
    .then((location) => dispatch(addAnkeny(location)))
    .catch((error) => dispatch(locationFailed(error.message)));
};

export const fetchBettendorfBeverages = () => (dispatch) => {
  dispatch(locationLoading(true));

  return fetch('api/bettendorf')
    .then((response) => response.json())
    .then((location) => dispatch(addLocation(location)))
    .catch((error) => dispatch(locationFailed(error.message)));
};

export const sendUpdatedTaps = () => (dispatch) => {
  dispatch(updateLoading(true));

  return fetch('/api/update',
    {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: {'effyou': 'thisisthepartIdontunderstand - how do I get the shit to the thing'},
    })
    .then((response) => response.json())
    .then((tapList) => dispatch(updateTaps(tapList)))
    .catch((error) => dispatch(locationFailed(error.message)));
};
