import * as ActionTypes from './ActionTypes';

export const addFermentation = (fermentation) => ({
  type: ActionTypes.ADD_FERMENTATION,
  payload: fermentation,
});

export const fermentationLoading = () => ({
  type: ActionTypes.FERMENTATION_LOADING,
});

export const fermentationFailed = (errMess) => ({
  type: ActionTypes.FERMENTATION_FAILED,
  payload: errMess,
});
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

export const updateTaps = () => ({
  type: ActionTypes.UPDATE_TAPS,
});

export const updateLoading = () => ({
  type: ActionTypes.UPDATE_LOADING,
});

export const updateFailed = (errMess) => ({
  type: ActionTypes.UPDATE_FAILED,
  payload: errMess,
});

export const fetchBeverages = function () {
  return function (dispatch) {
    dispatch(beveragesLoading(true));
    return fetch('api/beverages')
      .then((response) => response.json())
      .then((beverages) => {
        let bevs = addBeverages(beverages);
        dispatch(bevs);
      })
      .catch((error) => dispatch(beveragesFailed(error.message)))
  };
};

export const fetchAnkenyBeverages = () => (dispatch) => {
  dispatch(locationLoading(true));

  return fetch('api/ankeny')
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

export const fetchFermentation = () => (dispatch) => {
  dispatch(fermentationLoading(true));

  return fetch('api/fermentationDetails/')
    .then((response) => response.json())
    .then((fermentation) => dispatch(addFermentation(fermentation)))
    .catch((error) => dispatch(fermentationFailed(error.message)));
};

export const sendUpdatedTaps = (newMenus, onSuccess) => (dispatch) => {
  dispatch(updateLoading());
  fetch('api/update',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          password: newMenus.password,
          ankeny: newMenus.ankeny,
          bettendorf: newMenus.bettendorf,
        },
      ]),
    })
    .then((response) => response.json())
    .then((postResponse) => {
      dispatch(updateTaps());
      dispatch(fetchAnkenyBeverages());
      dispatch(fetchBettendorfBeverages());
      dispatch(fetchFermentation());
      onSuccess(); // TODO: only do this on 200 and show error message
    })
    .catch((error) => dispatch(locationFailed(error.message)))
};
