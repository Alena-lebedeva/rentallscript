// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep3.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class TabBarStep3 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <a className={s.linkReset} onClick={() => nextPage("guest-requirements")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.guestRequirements)}
          >
            <FormattedMessage {...messages.guestRequirements} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("house-rules")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.houseRules)}
          >
            <FormattedMessage {...messages.houseRules} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("review-how-guests-book")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.reviewGuestBook)}
          >
            <FormattedMessage {...messages.reviewGuestBook} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("advance-notice")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.advanceNotice)}
          >
            <FormattedMessage {...messages.advanceNotice} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("booking-window")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.bookingWindow)}
          >
            <FormattedMessage {...messages.bookingWindow} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("min-max-nights")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.minMaxNights)}
          >
            <FormattedMessage {...messages.minMaxNights} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("pricing")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabPricing)}
          >
            <FormattedMessage {...messages.tabPricing} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("calendar")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabCalendar)}
          >
            <FormattedMessage {...messages.tabCalendar} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("discount")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabDiscount)}
          >
            <FormattedMessage {...messages.tabDiscount} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("booking-scenarios")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabBooking)}
          >
            <FormattedMessage {...messages.tabBooking} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("local-laws")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabLocalLaws)}
          >
            <FormattedMessage {...messages.tabLocalLaws} />
          </div>
        </a>

        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep3));
