import * as ActionTypes from './ActionTypes';

export const Fermentation = (state = {
  isLoading: false,
  errMess: null,
  fermentation: [],
}, action) => {
  //why is this called everywhere?
  //console.log("hey fucker" + action.type);
  switch (action.type) {
    case ActionTypes.LOCATION_LOADING:
      return {...state, isLoading: false, errMess: null, fermentation: []}
    case ActionTypes.ADD_FERMENTATION:
      return {...state, errMess: null, fermentation: action.payload, isLoading: false}
    case ActionTypes.FERMENTATION_LOADING:
      return {...state, errMess: null, fermentation: [], isLoading: true}
    case ActionTypes.FERMENTATION_FAILED:
      return {...state, errMess: action.payload, fermentation: [], isLoading: false}
    default:
      return state;

  }
}
