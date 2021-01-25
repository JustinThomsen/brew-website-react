import * as ActionTypes from './ActionTypes';

export const Ankeny = (state = {
    isLoading: true,
    errMess: null,
    ankenyMenu: []
}, action) => {
    switch (action.type) {
        case ActionTypes.FERMENTATION_LOADING:
            return {...state, errMess: null, fermentation: [], isLoading: false}
        case ActionTypes.ADD_ANKENY:
            return {...state, isLoading: false, errMess: null, ankenyMenu: action.payload}
        case ActionTypes.LOCATION_LOADING:
            return {...state, isLoading: true, errMess: null, ankenyMenu: []}
        case ActionTypes.LOCATION_FAILED:
            return {...state, isLoading: false, errMess: action.payload, ankenyMenu: []}
        default:
            return state;
    }
}
