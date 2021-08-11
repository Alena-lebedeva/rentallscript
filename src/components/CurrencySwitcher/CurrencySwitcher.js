// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Redux Action
import { choseToCurrency } from '../../actions/getCurrencyRates';

// Style
import { FormControl } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CurrencySwitcher.css';

class CurrencySwitcher extends React.Component {

  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isBaseCurrency: PropTypes.bool
    })).isRequired,
    baseCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string,
    choseToCurrency: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { choseToCurrency } = this.props;
    let value = event.target.value;
    choseToCurrency(value);
  }

  render() {
    const { currencies, baseCurrency, toCurrency } = this.props;
    let targetCurrency;
    if (toCurrency) {
      targetCurrency = toCurrency;
    } else {
      targetCurrency = baseCurrency;
    }
    return (
      <FormControl componentClass="select" value={targetCurrency} className={s.formControlSelect} onChange={this.handleChange}>
        {
          currencies.map((currency, key) => {
            if (currency.isEnable === true) {
              return <option key={key} value={currency.symbol}>{currency.symbol}</option>
            }
          })
        }
      </FormControl>
    );
  }

}

const mapState = (state) => ({
  currencies: state.currency.availableCurrencies,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
});

const mapDispatch = {
  choseToCurrency
};

export default withStyles(s)(connect(mapState, mapDispatch)(CurrencySwitcher));
