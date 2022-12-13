const totalCalculator = ({ expenses }) => {
  const total = expenses.reduce((acc, expense) => {
    // acc + expense.exchangeRates[expense.currency].ask
    const { value, exchangeRates, currency } = expense;
    const { ask } = exchangeRates[currency];
    console.log(value, ask, acc);
    return acc + (value * ask);
  }, 0);
  console.log(total);
  return total;
};

export default totalCalculator;
