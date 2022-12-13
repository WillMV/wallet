import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  renderTable = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return (expenses.map((expense) => {
        const DECIMAL = 10;
        const {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates,
        } = expense;
        const coin = exchangeRates[currency].name;
        const { ask } = exchangeRates[currency];
        const convertedValue = (value * ask).toFixed(2);
        return (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ parseFloat(value, DECIMAL).toFixed(2) }</td>
            <td>{ coin }</td>
            <td>{ parseFloat(ask, DECIMAL).toFixed(2) }</td>
            <td>{ convertedValue }</td>
            <td>Real</td>
            {/* <td><button></button></td> */}
          </tr>
        );
      }));
    }
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTable()}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
