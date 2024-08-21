export const INCREMENT_CART = "INCREMENT_CART";

export const incrementCart = (id) => {
  return {
    type: INCREMENT_CART,
    payload: id,
  };
};
