import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurriences } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expense: {
      id: '',
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: '',
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurriences());
  }

  saveExpense = async (e) => {
    e.preventDefault();
    const { expense } = this.state;
    const { dispatch } = this.props;
    await dispatch(fetchCurriences());
  };

  render() {
    const { currencies } = this.props;
    return (
      <form>
        {this.func}
        <input
          type="number"
          placeholder="Valor"
          data-testid="value-input"
        />
        <input
          type="text"
          data-testid="description-input"
        />
        <select
          data-testid="currency-input"
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
        >
          <option value="dinheiro">
            Dinheiro
          </option>
          <option value="credito">
            Cartão de crédito
          </option>
          <option value="debito">
            Cartão de débito
          </option>
        </select>
        <select
          data-testid="tag-input"
        >
          <option value="alimento">
            Alimentação
          </option>
          <option value="lazer">
            Lazer
          </option>
          <option value="trabalho">
            Trabalho
          </option>
          <option value="transporte">
            Transporte
          </option>
          <option value="saude">
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
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
