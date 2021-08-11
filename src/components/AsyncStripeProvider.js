import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

export default class AsyncStripeProvider extends Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired
  };

  // constructor
  constructor(props) {
    super(props);
    this.state = {
      stripe: null
    };
  }

  // life-cycle
  componentDidMount() {
    this._mounted = true;
    const { apiKey } = this.props;

    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => {
      if (this._mounted) {
        this.setState({
          stripe: window.Stripe(apiKey)
        });
      }
    };
    document.body && document.body.appendChild(stripeJs);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  // render
  render() {
    const { stripe } = this.state;

    return (
      <StripeProvider stripe={stripe}>
        {this.props.children}
      </StripeProvider>
    );
  }
}