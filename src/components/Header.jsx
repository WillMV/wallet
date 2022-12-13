import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, total } = this.props;
    return (
      <div>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">
          {total.toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
