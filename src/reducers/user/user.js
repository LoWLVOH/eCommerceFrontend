const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  mobilePhone: "",
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        id: payload._id,
        firstName: payload.firstname,
        lastName: payload.lastname,
        email: payload.email,
        mobilePhone: payload.mobilePhone,
      };
    case "RESET_USER":
      return initialState;
    default:
      return state;
  }
};

export default user;
