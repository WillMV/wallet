import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <form>
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
          <option value="" />
        </select>
      </form>
    );
  }
}

export default WalletForm;
