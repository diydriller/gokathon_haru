import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
} from "../actions/authAction";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
  }
  return state;
}
