const INITIAL_STATE = {
  curriencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'currencies':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default wallet;
