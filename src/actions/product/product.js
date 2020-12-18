const setProductList = (product) => (dispatch) =>
  dispatch({
    type: "SET_PRODUCT_LIST",
    payload: product,
  });

const resetProduct = () => (dispatch) =>
  dispatch({
    type: "RESET_PRODUCT",
  });

export default { setProductList, resetProduct };
