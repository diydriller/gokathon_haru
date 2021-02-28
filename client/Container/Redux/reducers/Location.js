import * as actionTypes from '../actions/actionTypes';

const initialState = {
    latitude: null,
    longitude: null,
}

const LocationReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_LOCATION:
            return {
                ...state,
                latitude: action.latitude,
                longitude: action.longitude
            }
        default:
            return state;
    }
}

export default LocationReducer;