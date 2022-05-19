import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoin } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchOfCoin } = this.props;
    fetchOfCoin();
  }

  render() {
    const { email, coins } = this.props;
    return (
      <div>
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">Total: 0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <label htmlFor="despesa">
            Valor Despesa:
            <input data-testid="value-input" type="text" />
          </label>
          <label htmlFor="descricao-despesa">
            Descrição Despesa:
            <input data-testid="description-input" type="text" />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select id="moeda">
              {coins.map((coin) => <option key={ coin }>{coin}</option>)}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  coins: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOfCoin: () => dispatch(fetchCoin()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  coins: PropTypes.arrayOf,
}.isRequerid;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
