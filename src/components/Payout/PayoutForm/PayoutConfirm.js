import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

import { formValueSelector } from 'redux-form';

// Components
import PayPal from './Paypal';
import Stripe from './Stripe';

class PayoutConfirm extends Component {
  static propTypes = {
    previousPage: PropTypes.any.isRequired,
    paymentType: PropTypes.string.isRequired
  };



  render() {
    const { paymentType, previousPage } = this.props;
    if (paymentType === 2) {
      return <Stripe
        previousPage={previousPage}
      />
    } else {
      return <PayPal
        previousPage={previousPage}
      />
    }
  }
}

const selector = formValueSelector('PayoutForm');

const mapState = (state) => ({
  paymentType: selector(state, 'paymentType')
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(PayoutConfirm);