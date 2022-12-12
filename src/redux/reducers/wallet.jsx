const INITIAL_STATE = {
  currencies: [],
  currenciesDetails: {},
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'SAVE_CURRENCIES_DETAILS':
    return {
      ...state,
      currenciesDetails: action.details,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: expenses.push(action.expense),
    };
  default:
    return state;
  }
};

export default wallet;