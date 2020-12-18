const addCartProduct = (product) => (dispatch) =>
  dispatch({
    type: "ADD_CART_PRODUCT",
    payload: product,
  });

const deleteCartProduct = (id) => (dispatch) =>
  dispatch({
    type: "DELETE_CART_PRODUCT",
    payload: id,
  });

const resetCart = () => (dispatch) =>
  dispatch({
    type: "RESET_CART",
  });

export default { addCartProduct, deleteCartProduct, resetCart };
