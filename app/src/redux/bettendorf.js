import * as ActionTypes from './ActionTypes';

export const Bettendorf = (state = {
    isLoading: true,
    errMess: null,
    bettendorfMenu: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LOCATION:
            return {...state, isLoading: false, errMess: null, bettendorfMenu: action.payload}
        case ActionTypes.LOCATION_LOADING:
            return {...state, isLoading: true, errMess: null, bettendorfMenu: []}
        case ActionTypes.LOCATION_FAILED:
            return {...state, isLoading: false, errMess: action.payload, bettendorfMenu: []}

        default:
            return state;

    }
}
