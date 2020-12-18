const initialState = {
  id: "",
  stripeId: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: {
    line1: "",
    line2: "",
    postal_code: "",
    city: "",
  },
  card: {
    last4: "",
    exp_month: "",
    exp_year: "",
    id: "",
  },
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        id: payload._id,
        stripeId: payload.stripeId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        email: payload.email,
        address: payload.address,
        card: payload.card,
      };

    case "UPDATE_USER":
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        address: payload.address,
      };
    case "RESET_USER":
      return initialState;
    case "ADD_CARD":
      return {
        ...state,
        card: {
          last4: payload.last4,
          exp_month: payload.exp_month,
          exp_year: payload.exp_year,
          id: payload.id,
        },
      };
    case "DELETE_CARD":
      return {
        ...state,
        card: {
          last4: "",
          exp_month: "",
          exp_year: "",
          id: "",
        },
      };
    default:
      return state;
  }
};

export default user;
