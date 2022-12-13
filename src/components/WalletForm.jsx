import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurriences, addExpense, addTotal } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
  };

  async componentDidMount() {
    await this.dispatcher('fetchCurriences');
  }

  dispatcher = async (disp, data) => {
    const { dispatch } = this.props;
    switch (disp) {
    case 'fetchCurriences':
      await dispatch(fetchCurriences());
      break;
    case 'addExpense':
      dispatch(addExpense(data));
      break;
    case 'addTotal':
      dispatch(addTotal());
      break;
    default:
      return null;
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  saveExpense = async (e) => {
    e.preventDefault();
    await this.dispatcher('fetchCurriences');
    const { details, expenses } = this.props;
    const { state } = this;
    const dataExpense = {
      ...state,
      id: expenses.length,
      exchangeRates: details,
    };
    this.dispatcher('addExpense', dataExpense);
    this.dispatcher('addTotal');
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        {this.func}
        <input
          type="number"
          placeholder="Valor"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          placeholder="Descrição"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
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
          onChange={ this.handleChange }
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
          onChange={ this.handleChange }
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
          onClick={ this.saveExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  details: PropTypes.shape().isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  details: state.wallet.currenciesDetails,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
