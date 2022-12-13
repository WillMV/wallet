import totalCalculator from '../../services';

const INITIAL_STATE = {
  currencies: [],
  currenciesDetails: {},
  expenses: [],
  total: 0,
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
      expenses: [...state.expenses, action.expense],
    };
  case 'EXPENSES_TOTAL':
    return {
      ...state,
      total: totalCalculator(state),
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
