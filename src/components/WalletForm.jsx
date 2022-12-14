import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurriences } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurriences());
  }

  prevSaveExpense = (e) => {
    e.preventDefault();
    const { saveExpense } = this.props;
    saveExpense();
  };

  render() {
    const {
      expense: {
        value,
        description,
        currency,
        method,
        tag,
      },
      handleChange,
      currencies,
      btnName,
    } = this.props;

    return (
      <form>
        <input
          type="number"
          placeholder="Valor"
          data-testid="value-input"
          min={ 1 }
          name="value"
          value={ value }
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="Descrição"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ handleChange }
        >
          {
            currencies.map((curr) => (
              <option
                key={ curr }
                value={ curr }
              >
                {curr}
              </option>
            ))
          }
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ handleChange }
        >
          <option value="Dinheiro">
            Dinheiro
          </option>
          <option value="Cartão de crédito">
            Cartão de crédito
          </option>
          <option value="Cartão de débito">
            Cartão de débito
          </option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ handleChange }
        >
          <option value="Alimentação">
            Alimentação
          </option>
          <option value="Lazer">
            Lazer
          </option>
          <option value="Trabalho">
            Trabalho
          </option>
          <option value="Transporte">
            Transporte
          </option>
          <option value="Saúde">
            Saúde
          </option>
        </select>
        <button
          type="submit"
          onClick={ this.prevSaveExpense }
        >
          {btnName}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  btnName: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  details: state.wallet.currenciesDetails,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
