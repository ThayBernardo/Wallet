import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoin, ObjFor } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  componentDidMount() {
    const { fetchOfCoin } = this.props;
    fetchOfCoin();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  onClick = () => {
    const { fetchObj, expenses } = this.props;
    fetchObj({ ...this.state, id: expenses.length });
    this.setState({
      value: '',
    });
  }

  sum = () => {
    const { expenses } = this.props;
    return expenses.reduce((acumulador, valorAtual) => {
      const { value, currency, exchangeRates } = valorAtual;
      const total = Number(value) * Number(exchangeRates[currency].ask);
      return (total + acumulador);
    }, 0);
  }

  render() {
    const { email, coins } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{this.sum().toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <label htmlFor="despesa">
            Valor Despesa:
            <input
              data-testid="value-input"
              type="number"
              value={ value }
              onChange={ this.onInputChange }
              name="value"
            />
          </label>
          <label htmlFor="descricao-despesa">
            Descrição Despesa:
            <input
              data-testid="description-input"
              type="text"
              value={ description }
              onChange={ this.onInputChange }
              name="description"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select id="moeda" onChange={ this.onInputChange } name="currency">
              {coins.map((coin) => <option key={ coin }>{coin}</option>)}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select
              data-testid="method-input"
              onChange={ this.onInputChange }
              name="method"
              id="pagamento"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select
              data-testid="tag-input"
              onChange={ this.onInputChange }
              name="tag"
              id="categoria"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.onClick }>Adicionar Despesa</button>
        </div>
        <div>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  coins: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOfCoin: () => dispatch(fetchCoin()),
  fetchObj: (expense) => dispatch(ObjFor(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  coins: PropTypes.arrayOf,
}.isRequerid;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
