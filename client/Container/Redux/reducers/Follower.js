import { FETCH_FOLLOWERS } from "../actions/follower";

const initialState = {
  follower: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_FOLLOWERS:
      return {
        ...state,
        follower: action.payload,
      };
  }
  return state;
}
