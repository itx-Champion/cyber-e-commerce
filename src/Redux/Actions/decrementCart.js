export const DECREMENT_CART = "DECREMENT_CART";

export const decrementCart = (id) => {
  return {
    type: DECREMENT_CART,
    payload: id,
  };
};
