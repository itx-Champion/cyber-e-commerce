import { SET_ADDRESS } from "../Actions/setAddress";

const initialState = {
  address: [], 
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...state,
        address: [action.payload], 
      };
    default:
      return state;
  }
};

export default addressReducer;
