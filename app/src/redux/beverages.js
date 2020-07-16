import * as ActionTypes from './ActionTypes';

export const Beverages = (state = {
    isLoading: true,
    errMess: null,
    beverages: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BEVERAGES:
            return {...state, isLoading: false, errMess: null, beverages: action.payload}
        case ActionTypes.BEVERAGES_LOADING:
            return {...state, isLoading: true, errMess: null, beverages: []}

        case ActionTypes.BEVERAGES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, beverages: []}

        default:
            return state;

    }
}
