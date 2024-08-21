export const REMOVE_To_CART = "REMOVE_To_CART";

export const removeToCart = (id) => ({
    type: REMOVE_To_CART,
    payload: { id }
  });


