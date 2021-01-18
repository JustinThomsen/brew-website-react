import * as ActionTypes from './ActionTypes';
//need help with the action type
export const Update = (state = {
  isLoading: false,
  errMess: null,
  successMess: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.LOCATION_LOADING:
      return {...state, isLoading: false, successMess: null, errMess: null}
    case ActionTypes.UPDATE_TAPS:
      return {...state, isLoading: false, successMess: 'Fuck ya', errMess: null}
    case ActionTypes.UPDATE_LOADING:
      return {...state, isLoading: true, successMess: null, errMess: null}
    case ActionTypes.UPDATE_FAILED:
      return {...state, isLoading: false, successMess: null, errMess: action.payload}

    default:
      return state;

  }
}
