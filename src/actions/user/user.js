const setUser = (
  _id,
  stripeId,
  firstName,
  lastName,
  email,
  phone,
  address,
  card
) => (dispatch) =>
  dispatch({
    type: "SET_USER",
    payload: {
      _id,
      stripeId,
      firstName,
      lastName,
      email,
      phone,
      address,
      card,
    },
  });

const updateUser = (firstName, lastName, phone, address) => (dispatch) =>
  dispatch({
    type: "UPDATE_USER",
    payload: {
      firstName,
      lastName,
      phone,
      address,
    },
  });

const addCard = (last4, exp_month, exp_year, id) => (dispatch) =>
  dispatch({
    type: "ADD_CARD",
    payload: {
      last4,
      exp_month,
      exp_year,
      id,
    },
  });

const deleteCard = () => (dispatch) =>
  dispatch({
    type: "DELETE_CARD",
  });

const resetUser = () => (dispatch) =>
  dispatch({
    type: "RESET_USER",
  });

export default {
  setUser,
  updateUser,
  addCard,
  deleteCard,
  resetUser,
};
