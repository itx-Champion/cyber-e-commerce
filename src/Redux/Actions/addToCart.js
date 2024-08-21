export const ADD_To_CART = "ADD_To_CART";

export const addToCart = (product) => ({
    type: ADD_To_CART,
    payload: product,
  });
