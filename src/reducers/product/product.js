const initialState = [];

const product = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_PRODUCT_LIST":
      return payload;
    case "RESET_PRODUCT":
      return initialState;
    default:
      return state;
  }
};

export default product;
