import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { fetchCurriences, addExpense, addTotal, editExpense } from '../redux/actions';

class Wallet extends React.Component {
  state = {
    expense: {
      value: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
    },
    editing: false,
    btnName: 'Adicionar despesa',
  };

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
    case 'editExpense':
      dispatch(editExpense(data));
      break;
    default:
      return null;
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(({ expense }) => ({
      expense: {
        ...expense,
        [name]: value,
      },
    }));
  };

  editExpense = ({ target: { name } }) => {
    const { editing } = this.state;
    const { details: exchangeRates } = this.props;
    const id = parseInt(name, 10);
    const editarDespesa = 'Editar Despesa';
    if (!editing) {
      this.setState((prevState) => ({
        editing: true,
        btnName: editarDespesa,
        expense: {
          ...prevState.expense,
          id,
          exchangeRates,
        },
      }));
    }
  };

  saveEditExpense = () => {
    const { expense } = this.state;
    const { dispatch } = this.props;
    const adicionarDespesa = 'Adicionar despesa';
    dispatch(editExpense(expense));
    this.dispatcher('addTotal');
    this.setState({
      editing: false,
      btnName: adicionarDespesa,
      expense: {
        ...expense,
        value: '',
        description: '',
      },
    });
  };

  saveNewExpense = async () => {
    await this.dispatcher('fetchCurriences');
    const { details, expenses } = this.props;
    const { expense } = this.state;
    const dataExpense = {
      ...expense,
      id: expenses.length < 1
        ? 0
        : expenses[expenses.length - 1].id + 1,
      exchangeRates: details,
    };
    this.dispatcher('addExpense', dataExpense);
    this.dispatcher('addTotal');
    this.setState(() => ({
      expense: {
        ...expense,
        value: '',
        description: '',
      },
    }));
  };

  saveExpense = () => {
    const { editing } = this.state;
    if (editing) {
      this.saveEditExpense();
    } else {
      this.saveNewExpense();
    }
  };

  render() {
    const { expense, btnName } = this.state;
    return (
      <div>
        <Header />
        <WalletForm
          expense={ expense }
          handleChange={ this.handleChange }
          saveExpense={ this.saveExpense }
          btnName={ btnName }
        />
        <Table
          editExpense={ this.editExpense }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  details: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  details: state.wallet.currenciesDetails,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Wallet);
