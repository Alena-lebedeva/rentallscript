import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';

import {
  Row,
  FormGroup,
  Col,
  FormControl
} from 'react-bootstrap';

// Stripe
import {
  injectStripe,
  CardElement,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from 'react-stripe-elements';
import { toastr } from 'react-redux-toastr';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

// Helpers
import validate from './validate';
import fetch from '../../../core/fetch';

// Component
import HouseRules from './HouseRules';
import Loader from '../../Loader';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';
import { makePayment } from '../../../actions/booking/makePayment';
import { processCardAction } from '../../../actions/PaymentIntent/processCardAction';

//Images 
import imageOne from '../../../../public/SiteIcons/payment-icons.png';
import imageTwo from '../../../../public/SiteIcons/stripe-connect.png';
import AvatarIMage from './logo-small.jpg';


const createOptions = () => {
  return {
    style: {
      base: {
        color: '#484848',
        fontWeight: 400,
        //fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
        fontFamily: 'inherit',
        fontSize: '14px',
        fontSmoothing: 'antialiased',
        ':focus': {
          color: '#484848',
        },

        '::placeholder': {
          color: '#aaa',
        },

        ':focus::placeholder': {
          color: '#aaa',
        },
      },
      invalid: {
        color: '#303238',
        ':focus': {
          color: '#484848',
        },
        '::placeholder': {
          color: '#aaa',
        },
      },
    }
  }
};
class PaymentForm extends Component {
  static propTypes = {
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    hostDisplayName: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    initialValues: PropTypes.shape({
      listId: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      checkIn: PropTypes.object.isRequired,
      checkOut: PropTypes.object.isRequired,
      guests: PropTypes.number.isRequired,
      basePrice: PropTypes.number.isRequired,
      cleaningPrice: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      weeklyDiscount: PropTypes.number,
      monthlyDiscount: PropTypes.number,
      paymentType: PropTypes.number
    }).isRequired,
    paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired
    })),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    paymentCurrencyList: [],
    paymentLoading: false
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentStatus: 2
    }
    this.renderpaymentCurrencies = this.renderpaymentCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, disabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl;

    let rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? formatMessage(messages.guests) : formatMessage(messages.guest)}</option>);
    }
    return rows;
  }

  renderpaymentCurrencies() {
    const { paymentCurrencyList } = this.props;
    let rows = [];

    if (paymentCurrencyList != null && paymentCurrencyList.length > 0) {
      paymentCurrencyList.map((item, index) => {
        if (item.isEnable && item.isPayment) {
          rows.push(<option key={index} value={item.symbol}>{item.symbol}</option>);
        }
      })
    }
    return rows;
  }

  renderFormControl = ({ input, label, type, placeholder, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={placeholder} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(reset('BookingForm'));
  }

  async handleSubmit(values, dispatch) {
    const { stripe, processCardAction } = this.props;

    let paymentType = values.paymentType;
    let paymentCurrency = values.paymentType == 1 ? values.paymentCurrency : null;

    let query = `query checkReservation ($checkIn: String,$checkOut: String,$listId: Int ){
      checkReservation(checkIn: $checkIn, checkOut:$checkOut, listId:$listId ){
        id
        listId
        hostId
        guestId
        checkIn
        checkOut
        status
      }
    }`;

    const params = {
      listId: values.listId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
    };

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: params,
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.checkReservation && data.checkReservation.status == "200") {
      let msg = '', paymentMethodId, createPaymentMethod;

      if (paymentType == 2) {
        createPaymentMethod = await stripe.createPaymentMethod('card', {
          card: <CardElement />,
          billing_details: {
            address: {
              postal_code: values.zipcode
            }
          }
        })

        if (createPaymentMethod && createPaymentMethod.paymentMethod) {
          paymentMethodId = createPaymentMethod.paymentMethod.id
        }
      }

      if (createPaymentMethod && createPaymentMethod.error && createPaymentMethod.error.message && paymentType == 2) {
        msg = createPaymentMethod.error.message
        toastr.error("Oops!", msg);
      } else {

        if (Number(values.paymentType) == 2 && !values.zipcode) {
          toastr.error("Oops!", 'Your Zip code is incomplete.');
          return;
        }

        const { status, paymentIntentSecret, reservationId } = await dispatch(makePayment(
          values.listId,
          values.listTitle,
          values.hostId,
          values.guestId,
          values.checkIn,
          values.checkOut,
          values.guests,
          values.message,
          values.basePrice,
          values.cleaningPrice,
          values.currency,
          values.discount,
          values.discountType,
          values.guestServiceFee,
          values.hostServiceFee,
          values.total,
          values.bookingType,
          paymentCurrency,
          paymentType,
          values.guestEmail,
          values.bookingSpecialPricing,
          values.isSpecialPriceAssigned,
          values.isSpecialPriceAverage,
          values.dayDifference,
          paymentMethodId
        )
        );

        if (status == 400 && paymentType == 2) {
          const cardAction = await stripe.handleCardAction(
            paymentIntentSecret,
          );
          let amount = values.total + values.guestServiceFee;
          let confirmPaymentIntentId;

          if (cardAction && cardAction.paymentIntent && cardAction.paymentIntent.id) {
            confirmPaymentIntentId = cardAction.paymentIntent.id;

            const { handleCardActionStatus, errorMessage } = await processCardAction(
              reservationId,
              values.listId,
              values.hostId,
              values.guestId,
              values.listTitle,
              values.guestEmail,
              amount,
              values.currency,
              confirmPaymentIntentId
            );

          } else {
            if (cardAction && cardAction.error && cardAction.error.message) {
              msg = cardAction.error.message;
              toastr.error("Oops!", msg);
            }
          }
        }

      }

    } else {
      toastr.error("Oops!", "Those dates are not available.");

    }

  }

  handlePayment(e) {
    let paymentType = e.target.value;

    if (paymentType == 2) {
      this.setState({ paymentStatus: 2 })
    } else {
      this.setState({ paymentStatus: 1 })
    }

  }

  render() {
    const { hostDisplayName, houseRules, allowedPersonCapacity, paymentLoading } = this.props;
    const { handleSubmit, submitting, error, pristine, paymentType, stripe } = this.props;
    const { listId, guestPicture } = this.props;
    const { paymentStatus } = this.state;
    const { formatMessage } = this.props.intl;

    let elementClasses = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid',
    };



    return (
      <div className={cx(s.bookItPanel, s.spaceTop2, s.aboutNoMargin)}>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <Row>
            <Col md={12} className={cx(s.textLeft)}>
              <div className={s.h3}>
                <FormattedMessage {...messages.aboutYourTrip} />
              </div>
              <div className={s.aboutPaymentDesc}>
                <FormattedMessage {...messages.aboutDescPayment} />
              </div>
              <div className={cx(s.bookItDetails, s.spaceTop2, s.space4)}>
                <span><FormattedMessage {...messages.whoComing} /></span>
                <Row className={s.spaceTop2}>
                  <Col md={12} lg={5}>
                    <Field name="guests" component={this.renderFormControlSelect} className={s.formControlSelect} >
                      {
                        this.renderGuests(allowedPersonCapacity)
                      }
                    </Field>
                  </Col>
                </Row>
              </div>
              <div className={s.displayTable}>
                <div className={s.displayTableRow}>
                  <div className={cx(s.displayTableCell, s.avatarSection, s.vtrTop)}>
                    <img src={'/images/avatar/medium_' + guestPicture} className={s.avatarImage} />
                  </div>
                  <div className={cx(s.displayTableCell, s.messageSection, s.vtrTop)}>
                    <div >
                      <span><FormattedMessage {...messages.sayHello} />:</span>
                    </div>
                    <div>
                      <Field
                        className={s.textArea}
                        name="message"
                        component={this.renderFormControlTextArea}
                        label={formatMessage(messages.descriptionInfo)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {
                houseRules.length > 0 && <div className={s.space4}>
                  <HouseRules
                    hostDisplayName={hostDisplayName}
                    houseRules={houseRules}
                  />
                </div>
              }

            </Col>
            <Col md={10} className={cx(s.textLeft)}>
              <section>
                <header className={s.paymentHeader}>
                  <Row>
                    <Col md={10} className={cx(s.textLeft, s.paymentPadding)}>
                      <h3 className={cx(s.pullLeft, s.h3, s.space2)}><FormattedMessage {...messages.payment} /></h3>
                    </Col>
                  </Row>
                </header>
              </section>
              <Field
                name="paymentType"
                type="text"
                className={cx(s.formControlSelect, s.fullWithSelect)}
                component={this.renderFormControlSelect}
                onChange={(e) => this.handlePayment(e)}
              >
                <option value={2}>Credit Card</option>
                <option value={1}>PayPal</option>
              </Field>
              {
                paymentStatus == 2 &&
                <Row className={cx(s.space4, s.spaceTop2, s.responsivecardSection)}>
                  <Col lg={10} md={11} sm={8} xs={12} className={cx(s.noPadding, s.spaceTop2, s.cardSection)}>
                    <div className={'placeHolderFont'}>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <label className={s.labelText}>
                          <FormattedMessage {...messages.paymentCardNumber} />
                        </label>
                        <CardNumberElement
                          {...createOptions()}
                          placeholder={"4242 4242 4242 4242"}
                          className={cx(s.cardNumber, s.cardNumberSection, s.cardNumberSectionOne)}
                        />
                      </Col>
                      <Col lg={4} md={4} sm={4} xs={6}>
                        <label className={s.labelText}>
                          <FormattedMessage {...messages.cardExpires} />
                        </label>
                        <CardExpiryElement
                          placeholder="MM / YY"
                          {...createOptions()}
                          className={cx(s.cardNumber, s.cardNumberSectionTwo, s.cardNumberSection)}
                        />
                      </Col>
                      <Col lg={4} md={4} sm={4} xs={6}>
                        <label className={s.labelText}>
                          <FormattedMessage {...messages.cvv} />
                        </label>
                        <CardCvcElement
                          placeholder="_ _ _"
                          {...createOptions()}
                          className={cx(s.cardNumber, s.cardNumberSectionThree, s.cardNumberSection)}
                        />
                      </Col>
                      <Col lg={4} md={4} sm={4} xs={12}>
                        <label className={s.labelText}>
                          <FormattedMessage {...messages.zipcode} />
                        </label>
                        <Field
                          name="zipcode"
                          component={this.renderFormControl}
                          className={cx(s.cardInput, s.cardNumber, s.noBoxShadow, s.cardNumberSection, s.cardNumberSectionFour)}
                          placeholder={formatMessage(messages.zipcode)}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={5} xs={7}>
                        <img src={imageOne} className={cx(s.fullWidth, s.stripeImg)} />
                      </Col>
                      <Col lg={5} md={5} sm={4} xs={5} className={cx(s.pullRight, s.textRight)}>
                        <img src={imageTwo} className={cx(s.fullWidth, s.stripeImg)} />
                      </Col>
                    </div>
                  </Col>
                </Row>
              }
              {
                paymentStatus == 1 &&
                <Row className={s.space4}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={s.countryName}>
                      <span>
                        <FormattedMessage {...messages.paymentCurrency} />
                      </span>
                    </div>
                    <div className={s.selectContainer}>
                      <Field name="paymentCurrency" disabled={paymentType == 2} component={this.renderFormControlSelect} className={s.formControlSelect} >
                        <option value="">{formatMessage(messages.chooseCurrency)}</option>
                        {
                          this.renderpaymentCurrencies()
                        }
                      </Field>
                    </div>
                    <span className={cx(s.textLight, s.spaceTop1)}>
                      <FormattedMessage {...messages.loginInfo} />
                    </span>
                  </Col>
                </Row>
              }
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className={s.cancelBtn}>
                    <Loader
                      type={"button"}
                      buttonType={"submit"}
                      className={cx(s.button, s.btnPrimary, s.btnlarge)}
                      disabled={pristine || submitting || error}
                      show={paymentLoading}
                      label={formatMessage(messages.payNow)}
                    />
                  </div>
                  {
                    !paymentLoading && <div className={s.spaceTop1}>
                      <Link
                        to={"/rooms/" + listId}
                        className={cx(s.cancelLinkText)}
                        onClick={this.handleClick}
                      >
                        <FormattedMessage {...messages.cancel} />
                      </Link>
                    </div>
                  }
                  {
                    paymentLoading && <div className={s.spaceTop1}>
                      <a
                        href="javascript:void(0)"
                        className={cx(s.cancelLinkText)}
                      >
                        <FormattedMessage {...messages.cancel} />
                      </a>
                    </div>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div >
    );
  }
}

PaymentForm = reduxForm({
  form: 'PaymentForm', // a unique name for this form
  validate
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = (state) => ({
  paymentCurrencyList: state.currency.availableCurrencies,
  paymentLoading: state.book.paymentLoading,
  paymentType: selector(state, 'paymentType')
});

const mapDispatch = {
  // makePayment,
  processCardAction
};

export default injectStripe(injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentForm))));
