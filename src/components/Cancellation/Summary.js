import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';

// Locale
import messages from '../../locale/messages';
class Summary extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    userType: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    nights: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired,
    cancelData: PropTypes.shape({
      remainingNights: PropTypes.number,
    }).isRequired
  };

  static defaultProps = {};

  render() {
    const { userType, firstName, guests, nights, interval } = this.props;
    const { cancelData: { remainingNights } } = this.props;
    const { formatMessage } = this.props.intl;
    let started;
    if (remainingNights > 0) {
      started = nights - remainingNights;
    } else {
      started = interval;
    }

    return (
      <div>
        {
          userType === 'guest' &&
          <h3 className={cx(s.landingContentTitle, s.space5)}>
            <FormattedMessage {...messages.cancelYourTrip} />
          </h3>
        }

        {
          userType === 'host' && <div>
            <h3 className={cx(s.landingContentTitle, s.space5)}>
              <FormattedMessage {...messages.cancelYourReservation} />
            </h3>
            <span className={cx(s.landingSubTitle, s.space5)}>
              <FormattedMessage {...messages.consider} />{' '}{firstName}'s{' '}
              <FormattedMessage {...messages.tripBeforeCanceling} />
            </span>
            <p className={cx(s.landingStep, s.space3, s.spaceTop2)}>
              <span>
                <FormattedMessage {...messages.cancellingInfo} />
              </span>
            </p>
          </div>
        }
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            {
              remainingNights > 0 && <div>
                <span className={s.textBold}><FormattedMessage {...messages.started} /></span><br />
                <span>{started} {started > 1 ? formatMessage(messages.howManydays) : formatMessage(messages.howManyday)} ago</span>
              </div>
            }

            {
              (remainingNights === undefined || remainingNights === 0) && <div>
                <span className={s.textBold}><FormattedMessage {...messages.startIn} /></span><br />
                <span>{interval} {interval > 1 ? formatMessage(messages.howManydays) : formatMessage(messages.howManyday)}</span>
              </div>
            }
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <span className={s.textBold}><FormattedMessage {...messages.travelingWith} /></span><br />
            <span>{guests} {guests > 1 ? formatMessage(messages.howManyGuest) : formatMessage(messages.guest)}</span>
          </Col>
        </Row>
        <Row className={cx(s.space4, s.spaceTop3)}>
          <Col xs={6} sm={6} md={6} lg={6}>
            <span className={s.textBold}><FormattedMessage {...messages.stayingFor} /></span><br />
            <span>{nights} {nights > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</span>
          </Col>
        </Row>
        <div className={s.space3}>
          <span className={cx(s.landingSubTitle)}>
            <FormattedMessage {...messages.contactHostinfo2} />{' '}{firstName}{' '}
            <FormattedMessage {...messages.needToCancel} />
          </span>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(Summary));
