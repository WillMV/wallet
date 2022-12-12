import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    }, this.validatorButton);
  };

  validateEmail = () => {
    const { email } = this.state;
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  };
  // disableAltered = (e) => {
  //   console.log(e.type);
  //   this.setState({
  //     disabled: true,
  //   });
  // };

  validatePassword = () => {
    const MIN_LENGTH = 6;
    const { password } = this.state;
    return password.length >= MIN_LENGTH;
  };

  validatorButton = () => {
    const validEmail = this.validateEmail();
    const validPassword = this.validatePassword();
    this.setState({
      disabled: !(validEmail && validPassword),
    });
  };

  login = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { disabled, email, password } = this.state;

    return (
      <form>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Email"
            data-testid="email-input"
            value={ email }
            // onInvalid={ this.disableAltered }
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            placeholder="Senha"
            pattern=".{6,}"
            data-testid="password-input"
            value={ password }
            // onInvalid={ this.disableAltered }
            onChange={ this.handleChange }
            required
          />
        </label>
        <button type="submit" disabled={ disabled } onClick={ this.login }>
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
