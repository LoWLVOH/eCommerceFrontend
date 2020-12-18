const initialState = [];

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_CART_PRODUCT":
      return [...state, payload];
    case "DELETE_CART_PRODUCT":
      const deleteProduct = [
        ...state.filter((product) => product.id !== payload),
      ];
      return deleteProduct;
    case "RESET_CART":
      return initialState;
    default:
      return state;
  }
};

export default cart;
