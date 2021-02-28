import * as actionTypes from "../actions/actionTypes";

const initialState = {
  modalVisible: false,
};

const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    case actionTypes.BACKDROP_CLICKED:
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    default:
      return state;
  }
};

export default UIReducer;
