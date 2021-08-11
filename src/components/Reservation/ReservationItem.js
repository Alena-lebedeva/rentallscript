import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';
import {
  Label
} from 'react-bootstrap';

// Component
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';

// Redux action
import { sendMessageAction } from '../../actions/message/sendMessageAction';

// Locale
import messages from '../../locale/messages';
class ReservationItem extends Component {
  static propTypes = {
    noList: PropTypes.bool,
    userType: PropTypes.string.isRequired,
    threadId: PropTypes.number.isRequired,
    reservationId: PropTypes.number.isRequired,
    reservationState: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    profileId: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    sendMessageAction: PropTypes.any.isRequired,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    noList: false,
    checkIn: null,
    checkOut: null
  };

  sendMessage(type) {
    const { sendMessageAction, threadId, userType, checkIn, checkOut, guests, reservationId } = this.props;
    sendMessageAction(threadId, userType, null, type, checkIn, checkOut, guests, reservationId);
  }

  reservationStyle() {
    const { reservationState } = this.props;
    let style, label;
    switch (reservationState) {
      case 'pending':
        label = <FormattedMessage {...messages.messageStatus5} />
        style = 'primary';
        break;
      case 'expired':
        label = <FormattedMessage {...messages.messageStatus9} />
        style = 'warning';
        break;
      case 'approved':
        label = <FormattedMessage {...messages.messageStatus4} />
        style = 'success';
        break;
      case 'declined':
        label = <FormattedMessage {...messages.messageStatus3} />
        style = 'danger';
        break;
      case 'completed':
        label = <FormattedMessage {...messages.panelHeader2} />
        style = 'success';
        break;
      case 'cancelled':
        label = <FormattedMessage {...messages.messageStatus11} />
        style = 'danger';
        break;
    }
    return <Label className={s.labelText} bsStyle={style}>{label}</Label>;
  }

  render() {
    const { threadId, userType, reservationId, reservationState, checkIn, checkOut, createdAt } = this.props;
    const { listId, title, street, city, state, country, zipcode } = this.props;
    const { profileId, displayName, picture, phoneNumber, email } = this.props;
    const { guestServiceFee, hostServiceFee, total, currency } = this.props;
    const { noList } = this.props;

    let isValue;

    if (reservationState == 'completed' || reservationState == 'approved') {
      isValue = '#5cb85c'
    } else if (reservationState == 'expired') {
      isValue = '#f0ad4e'
    } else if (reservationState == 'pending') {
      isValue = '#007bff'
    } else if (reservationState == 'declined' || reservationState == ' cancelled') {
      isValue = '#d9534f'
    }

    let checkInDate = checkIn ? moment(checkIn).format('Do MMM - ') : '';
    let checkOutDate = checkOut ? moment(checkOut).format('Do MMM, YYYY') : '';
    let createdDate = createdAt ? moment(createdAt).format('Do MMM, YYYY') : '';
    let subTotal = 0;
    let today = moment(), formattedCheckout = moment(checkOut);

    let enableCancel = false, enableIternary = false;
    if (reservationState === 'approved') {
      enableIternary = true;
    }

    if (reservationState === 'approved' && formattedCheckout > today) {
      enableCancel = true;
    }

    if (userType === 'host') {
      subTotal = total - hostServiceFee;
    } else {
      subTotal = total + guestServiceFee
    }

    return (
      <div className={s.positionRelative}>
        <div className={s.displayTable}>
          <div className={s.displayTableRow}>
            <div className={cx(s.displayTableCell, s.borderLine, s.dateSectionWidth, s.dateSection)}>
              <div className={cx('hidden-xs hidden-sm')}>
                <p className={cx(s.noMargin, s.dateFontNew, s.dateFontMargin, s.fontWeight)}>{createdDate}</p>
              </div>
            </div>
            <div className={s.circle} style={{ borderColor: isValue }}>
            </div>
            <div className={cx(s.positionRelative, s.spaceTop3)}>
              <div className={cx(s.displayTableCell, s.mainSection, s.space2, s.afterSection)}>
                <div className={s.displayTable}>
                  <div className={s.displayTableRow}>
                    <div className={cx(s.sectionTitleLight, s.displayTableCell, s.addressWidth, s.responsiveDisplay, s.tabScreenresolution)}>
                      {
                        !noList && <div>
                          <a href={"/rooms/" + listId} target={'_blank'} className={s.linkTitle}> {title} </a><br />
                        </div>
                      }
                      <span>{checkInDate}{checkOutDate}</span><br />
                      {
                        noList && userType === 'guest' && <span className={s.errorMessage}> <FormattedMessage {...messages.noList} /> </span>
                      }
                      {
                        noList && userType === 'host' && <span className={s.errorMessage}> <FormattedMessage {...messages.notexist} /> </span>
                      }
                      {
                        !noList && <div>
                          <span>{street}</span> <br />
                          <span>{city + (city ? ', ': '')}{state + (state ? ', ': '')}{country + (country ? ', ': '')}{zipcode} </span>
                        </div>
                      }
                      <p className={cx(s.sectionTitleLight, s.spaceTop1)}>
                        {this.reservationStyle()}
                      </p>
                    </div>
                    <div className={cx(s.displayTableCell, s.logoWidth, s.alignCenter, s.responsiveDisplay, s.responsiveAvatarSection, s.tabAvatarSection)}>
                      <div className={cx(s.mediaContainer, s.mediaWidth, s.responsiveAvatarImg)}>
                        <Avatar
                          source={picture}
                          height={50}
                          width={50}
                          title={displayName}
                          className={cx(s.profileAvatar, s.profileAvatarLink)}
                          withLink={noList ? false : true}
                          profileId={profileId}
                        />
                      </div>
                      <Link to={"/users/show/" + profileId} className={s.sectionTitleLight}>{displayName}</Link> <br />
                      {
                        reservationState && (reservationState === 'approved' || reservationState === 'completed') && <ul className={s.listLayout}>
                          <li>{phoneNumber}</li>
                          <li className={s.textWordBreak}>{email}</li>
                        </ul>
                      }
                    </div>
                    <div className={cx(s.displayTableCell, s.responsiveDisplay, s.tabPriceSection)}>
                      <p className={cx(s.space1, s.fontWeight, s.dateFont)}>
                        <CurrencyConverter
                          amount={subTotal}
                          className={s.bookItPrice}
                          from={currency}
                        />

                      </p>
                      <ul className={s.listLayout}>

                        {
                          !noList && <li><Link to={"/message/" + threadId + "/" + userType}> <FormattedMessage {...messages.messageHistroy} /></Link></li>
                        }

                        {
                          noList && <li><Link to={"/#"}><FormattedMessage {...messages.contactSupport} /></Link></li>
                        }

                        {
                          !noList && userType === 'guest' && enableIternary && <li><Link to={"/users/trips/itinerary/" + reservationId}> <FormattedMessage {...messages.viewItinerary} /></Link></li>
                        }
                        {
                          !noList && userType === 'guest' && <li><Link to={"/users/trips/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
                        }
                        {
                          !noList && userType === 'host' && (reservationState === 'approved' || reservationState === 'completed') && <li><Link to={"/users/trips/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
                        }
                        {
                          !noList && userType === 'host' && reservationState === 'pending' && <li>
                            <a onClick={() => this.sendMessage('approved')}>
                              <FormattedMessage {...messages.approve} />
                            </a>
                          </li>
                        }
                        {
                          !noList && userType === 'host' && reservationState === 'pending' && <li>
                            <a onClick={() => this.sendMessage('declined')}>
                              <FormattedMessage {...messages.decline} />
                            </a>
                          </li>
                        }
                        {
                          !noList && enableCancel && <li> <Link to={"/cancel/" + reservationId + "/" + userType}><FormattedMessage {...messages.cancel} /></Link></li>
                        }

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  sendMessageAction,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ReservationItem));