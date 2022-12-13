const totalCalculator = ({ expenses }) => (expenses.reduce((acc, expense) => {
  const { value, exchangeRates, currency } = expense;
  const { ask } = exchangeRates[currency];
  return acc + (value * ask);
}, 0));

export default totalCalculator;
