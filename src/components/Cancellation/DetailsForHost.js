import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import { formValueSelector, initialize, submit } from 'redux-form';

import {
  Row,
  Col,
  Panel,
  FormGroup,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';

// Components
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';

// Locale
import messages from '../../locale/messages';

// Images
import defaultPic from './large_no_image.jpeg';

class DetailsForHost extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    reservationId: PropTypes.number.isRequired,
    confirmationCode: PropTypes.number.isRequired,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number.isRequired,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    cancelData: PropTypes.shape({
      policyName: PropTypes.string.isRequired,
      accomodation: PropTypes.number.isRequired,
      guestFees: PropTypes.number.isRequired,
      remainingNights: PropTypes.number,
      interval: PropTypes.number.isRequired,
      nights: PropTypes.number.isRequired,
    }).isRequired,
    message: PropTypes.string,
    initialize: PropTypes.any,
    submit: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async handleCancel(cancellationData) {
    const { initialize, submit } = this.props;
    await initialize('CancellationForm', cancellationData, true);
    await submit('CancellationForm');
  }

  render() {
    const { reservationId, userType, firstName, guestEmail, checkIn, checkOut, guests, title, listId, picture, profileId, hostName } = this.props;
    const { basePrice, cleaningPrice, guestServiceFee, hostServiceFee, total, currency, threadId, confirmationCode } = this.props;
    const { cancelData: { policyName, accomodation, guestFees, remainingNights, interval, nights } } = this.props;
    const { message, holdeData } = this.props;
    const { formatMessage } = this.props.intl;
    let checkInDate = checkIn != null ? moment(checkIn).format('Do MMM YYYY') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('Do MMM YYYY') : '';
    let refundAmount = 0, refundAmountNoGuestFee = 0, refundDays = 0, earnedAmount = 0, earnedDays = 0, subtotal = 0;
    let isDisabled = true;

    let coverImage = holdeData && holdeData.listData && holdeData.listData.listPhotos.find(o => o.id == holdeData.listData.coverPhoto);

    let path = '/images/upload/x_medium_';
    let showImage;
    if (coverImage) {
      showImage = path + coverImage.name;
    } else if (!coverImage && holdeData.listData && holdeData.listData.listPhotos.length > 0) {
      showImage = path + (holdeData.listData && holdeData.listData.listPhotos[0].name);
    } else {
      showImage = defaultPic;
    }


    let bookingSpecialPricing = [], isSpecialPriceAssigned = false;
    let priceForDays = 0;

    holdeData.bookingSpecialPricing && holdeData.bookingSpecialPricing.map((item, key) => {
      let pricingRow, currentPrice;
      if (item.blockedDates) {
        isSpecialPriceAssigned = true;
        currentPrice = Number(item.isSpecialPrice);
      } else {
        currentPrice = Number(basePrice);
      }
      pricingRow = {
        blockedDates: item,
        isSpecialPrice: currentPrice,
      };
      bookingSpecialPricing.push(pricingRow);
    })

    if (isSpecialPriceAssigned) {
      bookingSpecialPricing.map((item, index) => {
        priceForDays = Number(priceForDays) + Number(item.isSpecialPrice);
      });
    } else {
      priceForDays = Number(basePrice) * Number(nights)
    }

    if (remainingNights >= 0) {
      if (remainingNights === nights) {
        refundAmount = total + guestServiceFee;
        refundAmountNoGuestFee = total - hostServiceFee;
        refundDays = nights;
      } else {
        refundAmount = (remainingNights * basePrice) + guestServiceFee;
        refundAmountNoGuestFee = (remainingNights * basePrice);

        refundDays = remainingNights;
        earnedAmount = total - (refundAmountNoGuestFee + hostServiceFee);
        earnedDays = nights - remainingNights;
      }
    } else {
      refundAmount = total + guestServiceFee;
      refundAmountNoGuestFee = total - hostServiceFee;
      refundDays = nights;
    }


    subtotal = total + guestServiceFee;

    let cancellationData = {
      reservationId,
      cancellationPolicy: policyName,
      refundToGuest: refundAmount,
      payoutToHost: earnedAmount,
      guestServiceFee: 0,
      hostServiceFee,
      total: subtotal,
      currency,
      threadId,
      cancelledBy: 'host',
      checkIn,
      checkOut,
      guests,
      hostName,
      guestName: firstName,
      listTitle: title,
      confirmationCode,
      guestEmail
    };
    if (message) {
      isDisabled = false;
    }

    return (
      <div>
        <Col xs={12} sm={5} md={5} lg={5}>
          <div className={s.bgCover}>
            <a href={"/rooms/" + listId} target="_blank">
              <div className={s.cancelBg} style={{ backgroundImage: `url(${showImage})` }}>
              </div>
            </a>
          </div>
          <Panel className={s.panelHeader}>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8} >
                <div className={s.textTruncate}>
                  <span className={cx(s.textHigh, s.textBold)}>{firstName}</span><br />
                  {/* <Link to={"/rooms/" + listId}> */}
                  <a href={"/rooms/" + listId} target="_blank">
                    {title}
                  </a>
                  {/* </Link> */}
                </div>
                <br />
              
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} className={s.textRight}>
                <div className={s.profileAvatarSection}>
                  <Avatar
                    source={picture}
                    height={65}
                    width={65}
                    title={firstName}
                    className={s.profileAvatar}
                    withLink
                    linkClassName={s.profileAvatarLink}
                    profileId={profileId}
                  />
                </div>
              </Col>
              <Col xs={12} sm={8} md={8} lg={8} >
              <div>
                  <span>{checkInDate} - {checkOutDate}</span>
                </div>
                </Col>  
            </Row>
            <hr />
            {
              refundDays > 0 && <Row>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textLeft}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <FormattedMessage {...messages.missedEarnings} />
                  </span><br />
                  <span>
                    <CurrencyConverter
                      amount={basePrice}
                      from={currency}
                    />
                  </span><span> x {refundDays} {refundDays > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</span><br />
                  {/* <span>{earnedDays > 0 ? 'minus' : 'plus'}{' '}
                    <FormattedMessage {...messages.cleaningMinusServiceFee} />
                  </span> */}
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textRight}>
                  <span className={cx(s.textHigh, s.textBold, s.textLine)}>
                    <CurrencyConverter
                      amount={refundAmountNoGuestFee}
                      from={currency}
                    />
                  </span>
                </Col>
              </Row>
            }
            {
              earnedDays > 0 && <Row>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textLeft}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <FormattedMessage {...messages.earnings} />
                  </span><br />
                  <span>
                    <CurrencyConverter
                      amount={basePrice}
                      from={currency}
                    />
                  </span><span> x {earnedDays} {earnedDays > 1 ? 'nights' : 'night'},</span><br />
                  <span><FormattedMessage {...messages.cleaningPlusServiceFee} /></span>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textRight}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <CurrencyConverter
                      amount={earnedAmount}
                      from={currency}
                    />
                  </span>
                </Col>
              </Row>
            }
            <div className={cx(s.space3, s.spaceTop3)}>
              <p className={cx(s.landingStep)}>
                <span>{firstName}{' '}
                  <FormattedMessage {...messages.willBeRefund} />{' '}{earnedDays > 0 ? '' : 'full'}{' '}
                  <FormattedMessage {...messages.reservationCost} />
                </span>
              </p>
            </div>
            <div className={s.cancellation}>
              <a href={'/cancellation-policies/' + policyName} target="_blank"><FormattedMessage {...messages.cancellationPolicy} />: <span className={s.greenColor}>{policyName}</span></a>
            </div>
          </Panel>
        </Col>
        <Col xs={12} sm={12} lg={12} md={12}>
          <hr className={cx(s.horizontalLineThrough, s.spaceTop4)} />
        </Col>
        <FormGroup className={s.formGroup}>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Link
              className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft, s.btnWidth)}
              to={"/reservation/current"}
            >
              <FormattedMessage {...messages.keepReservation} />
            </Link>
            <Button
              className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight, s.btnWidth)}
              onClick={() => this.handleCancel(cancellationData)}
              disabled={isDisabled}
            >
              <FormattedMessage {...messages.cancelYourReservation} />
            </Button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

const selector = formValueSelector('CancellationForm'); // <-- same as form name

const mapState = (state) => ({
  message: selector(state, 'message'),
});

const mapDispatch = {
  initialize,
  submit
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DetailsForHost)));
