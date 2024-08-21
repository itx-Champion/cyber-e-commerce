import { combineReducers } from "redux";
import cartReducer from "./CartReducer";
import addressReducer from "./AddressReducer";
import ShipmentReducer from "./ShipReducer";
const rootReducer = combineReducers({
  cart: cartReducer,
  address: addressReducer,
  method: ShipmentReducer,
});

export default rootReducer;
