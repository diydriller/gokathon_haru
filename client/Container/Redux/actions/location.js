import * as actionTypes from "./actionTypes";

export const setLocation = (latitude, longitude) => {
  return {
    type: actionTypes.SET_CURRENT_LOCATION,
    latitude,
    longitude,
  };
};
