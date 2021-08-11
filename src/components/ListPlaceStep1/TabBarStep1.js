// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep1.css';

// Locale
import messages from '../../locale/messages';

class TabBarStep1 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <a className={s.linkReset} onClick={() => nextPage("room")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.tabPlaceType)}
          >
            <FormattedMessage {...messages.tabPlaceType} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("bedrooms")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.bedrooms)}
          >
            <FormattedMessage {...messages.bedrooms} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("bathrooms")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.baths)}
          >
            <FormattedMessage {...messages.baths} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("map")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.location)}
          >
            <FormattedMessage {...messages.location} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("amenities")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.aminities)}
          >
            <FormattedMessage {...messages.aminities} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("spaces")} href="javascript:void(0);">
          <div
            className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)}
            title={formatMessage(messages.sharedSpaces)}
          >
            <FormattedMessage {...messages.sharedSpaces} />
          </div>
        </a>

        <div>
          <ProgressBar className={s.leanProgress} />
        </div>

      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep1));

