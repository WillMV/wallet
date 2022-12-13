export const addEmail = (email) => ({
  type: 'ADD_EMAIL',
  email,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const addTotal = () => ({
  type: 'EXPENSES_TOTAL',
});

const requestStarted = () => ({
  type: 'REQUEST_STARTED',
});

const receiveCurrencies = (currencies) => ({
  type: 'RECEIVE_CURRENCIES',
  currencies,
});

const saveCurrenciesDetails = (details) => ({
  type: 'SAVE_CURRENCIES_DETAILS',
  details,
});

export const fetchCurriences = () => async (dispatch) => {
  dispatch(requestStarted());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  dispatch(saveCurrenciesDetails(data));
  const arrayData = Object.keys(data);
  dispatch(receiveCurrencies(arrayData));
};
