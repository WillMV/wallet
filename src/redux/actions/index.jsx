const addEmail = (email) => ({
  type: 'ADD_EMAIL',
  email,
});

const requestStarted = () => ({
  type: 'REQUEST_STARTED',
});

const receiveCurrencies = (curriencies) => ({
  type: 'RECEIVE_CURRENCIES',
  curriencies,
});


export default addEmail;

