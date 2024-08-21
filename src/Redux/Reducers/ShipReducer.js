import { SHIPMENT_METHOD } from "../Actions/shipMethod";
const initialState = {
  method: null,
};
const ShipmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIPMENT_METHOD:
      return {
        ...state,
        method:action.payload,
      };
    default:
      return state;
  }
};
export default ShipmentReducer;
