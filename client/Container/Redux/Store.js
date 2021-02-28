import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import LocationReducer from "./reducers/Location";
import UIReducer from "./reducers/UI";
import PlanReducer from "./reducers/Plan";
import AuthReducer from "./reducers/authReducer";
import FollowerReducer from "./reducers/Follower";

const rootReducer = combineReducers({
  locationReducer: LocationReducer,
  UIReducer: UIReducer,
  PlanReducer: PlanReducer,
  UserReducer: AuthReducer,
  FollowerReducer: FollowerReducer,
});
const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);
