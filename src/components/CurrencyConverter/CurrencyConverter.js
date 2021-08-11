import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedNumber } from 'react-intl';

// Helper
import { convert } from '../../helpers/currencyConvertion';

class CurrencyConverter extends Component {

  static propTypes = {
    from: PropTypes.string,
    amount: PropTypes.number,
    base: PropTypes.string,
    rates: PropTypes.object,
    superSymbol: PropTypes.bool,
    className: PropTypes.string,
    toCurrency: PropTypes.string,
  };

  static defaultProps = {
    amount: 0,
    superSymbol: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      base: null,
      rates: null
    }
  }

  componentWillMount() {
    const { base, rates } = this.props;
    if (base != undefined && rates != undefined) {
      this.setState({ base: base, rates: rates });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { base, rates } = nextProps;
    if (base != undefined && rates != undefined) {
      this.setState({ base: base, rates: rates });
    }
  }

  render() {
    const { from, amount, superSymbol, className, toCurrency, locale, isCurrency } = this.props;
    const { base, rates } = this.state;
    
    let targetCurrency;
    let convertedAmount = amount;
    let fromCurrency = from || base;

    if (rates != null) {
      convertedAmount = convert(base, rates, amount, fromCurrency, toCurrency);
    }

    if (toCurrency) {
      targetCurrency = toCurrency;
    } else {
      targetCurrency = base;
    }

    return (
      <span className={className}>

        <FormattedNumber
          value={convertedAmount}
          style="currency"
          currency={targetCurrency}
          minimumFractionDigits={convertedAmount % 1 === 0 ? 0 : 2}
          maximumFractionDigits={convertedAmount % 1 === 0 ? 0 : 2}
          currencyDisplay={"symbol"}
        />
        {
          superSymbol && <sup>{targetCurrency}</sup>
        }

      </span>
    )
  }
}

const mapState = (state) => ({
  base: state.currency.base,
  toCurrency: state.currency.to,
  rates: state.currency.rates,
  locale: state.intl.locale
});

const mapDispatch = {};

export default injectIntl(connect(mapState, mapDispatch)(CurrencyConverter));


