import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userInfo from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      validateButton: false,
      email: '',
      password: '',
    };
  }

  goToTheWallet = () => {
    const { email } = this.state;
    const { savedEmail, history } = this.props;
    savedEmail(email);
    history.push('/carteira');
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, () => this.dissableButton());
  }

  verifyEmail = (email) => {
    const verify = /\S+@\S+\.\S+/;
    return verify.test(email);
  }

  dissableButton = () => {
    const { password, email } = this.state;
    const six = 6;
    if (password.length >= six && this.verifyEmail(email)) {
      this.setState({
        validateButton: true,
      });
    } else {
      this.setState({
        validateButton: false,
      });
    }
  }

  render() {
    const { validateButton, password, email } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              onChange={ this.onInputChange }
              data-testid="email-input"
              type="email"
              value={ email }
              name="email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Senha:
            <input
              onChange={ this.onInputChange }
              data-testid="password-input"
              type="password"
              value={ password }
              name="password"
            />
          </label>
        </div>
        <button
          onClick={ this.goToTheWallet }
          disabled={ !validateButton }
          type="button"
        >
          Entrar

        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savedEmail: (email) => dispatch(userInfo(email)),
});

Login.propTypes = {
  history: PropTypes.arrayOf(),
  savedEmail: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
