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
  // payload: update,
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
    dispatch(beveragesLoading(true))
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

export const sendUpdatedTaps = (newMenus, onSuccess) => (dispatch) => {
  dispatch(updateLoading());
  console.log(`newMenus: ${JSON.stringify(newMenus, null, 2)}`);
  console.log(newMenus[0].password)
  fetch('api/update',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        {
          'password': newMenus[0].password,
          'ankeny': [
            {
              'id': 0,
              'beveragesid': 13,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 1
            },
            {
              'id': 1,
              'beveragesid': 19,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 2
            },
            {
              'id': 2,
              'beveragesid': 2,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 3
            },
            {
              'id': 3,
              'beveragesid': 21,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 4
            },
            {
              'id': 4,
              'beveragesid': 18,
              'gas': 'Nitro',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 5
            },
            {
              'id': 5,
              'beveragesid': 13,
              'gas': 'Nitro',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 6
            },
            {
              'id': 6,
              'beveragesid': 13,
              'gas': 'Nitro',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 7
            },
            {
              'id': 7,
              'beveragesid': 14,
              'gas': '',
              'type': 'fermenter',
              'fermenter': '',
              'taphandle': ''
            },
            {
              'id': 8,
              'beveragesid': 2,
              'gas': '',
              'type': 'fermenting',
              'fermenter': 'More Beer Fermenter',
              'taphandle': ''
            },
            {
              'id': 9,
              'beveragesid': 15,
              'gas': '',
              'type': 'fermenter',
              'fermenter': '',
              'taphandle': ''
            },
            {
              'id': 10,
              'beveragesid': 25,
              'gas': '',
              'type': 'fermenting',
              'fermenter': 'SS Brewtech fermenter 1',
              'taphandle': ''
            },
            {
              'id': 11,
              'beveragesid': 16,
              'gas': '',
              'type': 'fermenter',
              'fermenter': '',
              'taphandle': ''
            },
            {
              'id': 12,
              'beveragesid': 25,
              'gas': '',
              'type': 'fermenting',
              'fermenter': 'SS Brewtech fermenter 2',
              'taphandle': ''
            },
            {
              'id': 13,
              'beveragesid': 17,
              'gas': '',
              'type': 'fermenter',
              'fermenter': '',
              'taphandle': ''
            },
            {
              'id': 14,
              'beveragesid': 10,
              'gas': '',
              'type': 'fermenting',
              'fermenter': 'Barrel',
              'taphandle': ''
            }
          ],
          'bettendorf': [
            {
              'id': 0,
              'beveragesid': 13,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 1
            },
            {
              'id': 1,
              'beveragesid': 13,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 2
            },
            {
              'id': 2,
              'beveragesid': 13,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 3
            },
            {
              'id': 3,
              'beveragesid': 27,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 4
            },
            {
              'id': 4,
              'beveragesid': 13,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 5
            },
            {
              'id': 5,
              'beveragesid': 26,
              'gas': 'Co2',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 6
            },
            {
              'id': 6,
              'beveragesid': 13,
              'gas': 'Nitro',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 7
            },
            {
              'id': 7,
              'beveragesid': 10,
              'gas': 'Nitro',
              'type': 'tap',
              'fermenter': '',
              'taphandle': 8
            }
          ]
        }
      ]),
    })
    .then((response) => response.json())
    .then((postResponse) => {
      dispatch(updateTaps());
      dispatch(fetchAnkenyBeverages());
      dispatch(fetchBettendorfBeverages());
      onSuccess(); // TODO: only do this on 200 and show error message
    })
    .catch((error) => dispatch(locationFailed(error.message)))
};
