import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">Total: 0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequerid;

export default connect(mapStateToProps)(Wallet);
