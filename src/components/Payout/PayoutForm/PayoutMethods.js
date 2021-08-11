import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { graphql, compose } from 'react-apollo';

// Redux Form
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
// Redux
import { connect } from 'react-redux';

import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';

// Graphql
import getPaymentMethodsQuery from './getPaymentMethods.graphql';

// Locale
import messages from '../../../locale/messages';

class PayoutMethods extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    previousPage: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    PaymentMethodsData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getPaymentMethods: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        processedIn: PropTypes.string.isRequired,
        fees: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired,
        paymentType: PropTypes.string.isRequired,
      }))
    })
  };

  static defaultProps = {
    PaymentMethodsData: {
      loading: true,
      getPaymentMethods: []
    }
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { PaymentMethodsData: { loading, getPaymentMethods } } = nextProps;
    const { change, paymentMethodId } = this.props;
    if (getPaymentMethods != null && getPaymentMethods.length > 0) {
      if (paymentMethodId === undefined || paymentMethodId === null) {
        change('methodId', getPaymentMethods[0].id);
        change('paymentType', getPaymentMethods[0].paymentType);
        change('currency', getPaymentMethods[0].currency);
      }
    }
  }

  handleChange(methodId, paymentType, currency) {
    const { change } = this.props;
    change('methodId', methodId);
    change('paymentType', paymentType);
    change('currency', currency);
  }

  render() {
    const { error, handleSubmit, previousPage } = this.props;
    const { PaymentMethodsData: { loading, getPaymentMethods } } = this.props;
    const { paymentMethodId } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <form onSubmit={handleSubmit}>
        <Panel
          className={s.panelHeader}
          header={formatMessage(messages.addPayout)}
          footer={
            <div>
              <Button className={cx(s.button, s.btnlarge, s.btnPrimaryBorder, s.btnRight)} onClick={previousPage}>
                <FormattedMessage {...messages.back} />
              </Button>
              <Button className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit">
                <FormattedMessage {...messages.next} />
              </Button>
            </div>
          }
        >
          <div className={s.panelBody}>
            <p className={s.payoutIntro}>
              <FormattedMessage {...messages.payoutIntro1} />
            </p>
            <p className={s.payoutIntro}>
              <FormattedMessage {...messages.payoutIntro2} />
            </p>
            {
              loading && <div> Loading...</div>
            }
            {
              !loading && getPaymentMethods != undefined && getPaymentMethods.length > 0 && <table className={cx('table', s.noBorder)}>
                <thead>
                  <tr className={cx(s.rowBorder, s.sectionTitleLight, s.textTruncate)}>
                    <th className={s.noBorder} />
                    <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle} /></th>
                    <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle1} /></th>
                    <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle2} /></th>
                    <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle3} /></th>
                    <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle4} /></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getPaymentMethods.map((item, index) => {
                      let checked = false;
                      if (item.id === paymentMethodId) {
                        checked = true;
                      }
                      return (
                        <tr className={cx(s.sectionTitleLight)} key={index}>
                          <td>
                            <input name="methodId" type="radio" checked={checked} value={item.id} onChange={() => this.handleChange(item.id, item.paymentType, item.currency)} />
                          </td>
                          <td><label className={s.radioText}>{item.name}</label></td>
                          <td>{item.processedIn}</td>
                          <td>{item.fees}</td>
                          <td>{item.currency}</td>
                          <td>{item.details}</td>
                        </tr>
                      );
                    })
                  }

                </tbody>
              </table>
            }
            {
              !loading && getPaymentMethods != undefined && getPaymentMethods.length === 0 && <div> <FormattedMessage {...messages.noPaymentFound} /> </div>
            }
          </div>
        </Panel>
      </form>
    );
  }
}

PayoutMethods = reduxForm({
  form: 'PayoutForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PayoutMethods);

const selector = formValueSelector('PayoutForm');

const mapState = (state) => ({
  paymentMethodId: selector(state, 'methodId')
});

const mapDispatch = {
  change
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getPaymentMethodsQuery, {
    name: 'PaymentMethodsData',
    options: {
      ssr: false,
    }
  }),
)(PayoutMethods);