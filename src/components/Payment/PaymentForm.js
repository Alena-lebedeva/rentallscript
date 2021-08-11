import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Row,
  FormGroup,
  Col,
  FormControl,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

// Helpers
import validate from './validate';
import submit from './submit';
import Loader from '../Loader';

// Locale
import messages from '../../locale/messages';

class PaymentForm extends Component {
  static propTypes = {
    hostName: PropTypes.string.isRequired,
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired,
      }),
    })),
    allowedGuests: PropTypes.number.isRequired,
    paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired,
    })),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    houseRules: [],
    paymentCurrencyList: [],
    paymentLoading: false,
  };

  constructor(props) {
    super(props);
    this.renderpaymentCurrencies = this.renderpaymentCurrencies.bind(this);
  }

  renderFormControlSelect({ input, label, meta: { touched, error }, children, className, isDisabled }) {
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} disabled={isDisabled} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
      </div>
    );
  }

  renderFormControlTextArea({ input, label, meta: { touched, error }, children, className, isDisabled }) {
    return (
      <FormGroup>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
          disabled={isDisabled}
        >
          {children}
        </FormControl>
      </FormGroup>
    );
  }

  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl;

    const rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? formatMessage(messages.guests) : formatMessage(messages.guest)}</option>);
    }
    return rows;
  }

  renderpaymentCurrencies() {
    const { paymentCurrencyList } = this.props;
    const rows = [];

    if (paymentCurrencyList != null && paymentCurrencyList.length > 0) {
      paymentCurrencyList.map((item, index) => {
        if (item.isEnable && item.isPayment) {
          rows.push(<option key={index} value={item.symbol}>{item.symbol}</option>);
        }
      });
    }
    return rows;
  }

  render() {
    const { houseRules, hostName, allowedGuests, paymentLoading } = this.props;
    const { handleSubmit, submitting, error, pristine } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.bookItPanel, s.spaceTop2)}>
        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <Col md={10} className={cx(s.textLeft)}>
              <div className={s.h3}>
                1.<FormattedMessage {...messages.aboutYourTrip} />
              </div>
              <div className={cx(s.bookItDetails, s.spaceTop2, s.space4)}>
                <span><FormattedMessage {...messages.whoComing} /></span>
                <Row className={s.spaceTop2}>
                  <Col md={12} lg={5}>
                    <Field name="guests" component={this.renderFormControlSelect} className={s.formControlSelect} isDisabled >
                      {
                        this.renderGuests(allowedGuests)
                      }
                    </Field>
                  </Col>
                </Row>
              </div>
              <div >
                <span><FormattedMessage {...messages.sayHello} />:</span>
              </div>
              <div>
                <FormGroup >
                  <Field
                    className={s.textArea}
                    name="message"
                    component={this.renderFormControlTextArea}
                    label={formatMessage(messages.descriptionInfo)}
                    isDisabled
                  />
                </FormGroup>
              </div>
              <div className={s.space4}>
                {
                  houseRules != null && houseRules.length > 0 && <Panel className={s.houseRulesPanel}>
                    <h3 className={s.textCenter}><span>{hostName}'s House Rules</span></h3>
                    {
                      houseRules.map((item, index) => (
                        <div className={s.houseRules} key={index}>
                          <span>{item.listsettings.itemName}</span>
                          <FontAwesome.FaCheckCircle className={s.circleIcon} />
                        </div>
                      ))
                    }
                  </Panel>
                }
              </div>
            </Col>
            <Col md={10} className={cx(s.textLeft)}>
              <section>
                <header className={s.paymentHeader}>
                  <Row>
                    <Col md={10} className={cx(s.textLeft)}>
                      <h3 className={s.pullLeft}>2.<FormattedMessage {...messages.payment} /></h3>
                    </Col>
                  </Row>
                </header>
              </section>
              <Row className={s.space4}>
                <Col xs={12}>
                  <span className={s.textLight}>
                    <FormattedMessage {...messages.paymentInfo} />
                  </span>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <div className={s.countryName}>
                    <span className={s.textRegular}><FormattedMessage {...messages.paymentCurrency} /></span>
                  </div>
                  <div className={s.selectContainer}>
                    <Field name="paymentCurrency" component={this.renderFormControlSelect} className={s.formControlSelect} >
                      <option value="">{formatMessage(messages.chooseCurrency)}</option>
                      {
                        this.renderpaymentCurrencies()
                      }
                    </Field>
                  </div>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <div className={s.countryName}>
                    <span className={s.textRegular}><FormattedMessage {...messages.paymentType} /></span>
                  </div>
                  <div className={s.selectContainer}>
                    <FormControl componentClass="select" className={s.formControlSelect} >
                      <option>{formatMessage(messages.paypal)}</option>
                    </FormControl>
                  </div>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <span className={s.textLight}><FormattedMessage {...messages.loginInfo} /></span>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Loader
                    type={'button'}
                    buttonType={'submit'}
                    className={cx(s.button, s.btnPrimary, s.btnlarge)}
                    disabled={submitting || error}
                    show={paymentLoading}
                    label={formatMessage(messages.login)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

PaymentForm = reduxForm({
  form: 'PaymentForm', // a unique name for this form
  validate,
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = state => ({
  paymentCurrencyList: state.currency.availableCurrencies,
  paymentLoading: state.book.paymentLoading,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentForm)));

