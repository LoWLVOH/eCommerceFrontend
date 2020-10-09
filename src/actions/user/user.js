const setUser = (id, firstname, lastname, email, mobilePhone) => (dispatch) =>
  dispatch({
    type: "SET_USER",
    payload: {
      id,
      firstname,
      lastname,
      email,
      mobilePhone,
    },
  });

const resetUser = () => (dispatch) =>
  dispatch({
    type: "RESET_USER",
  });

export default {
  setUser,
  resetUser,
};
