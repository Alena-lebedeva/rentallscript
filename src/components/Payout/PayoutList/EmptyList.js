import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Panel
} from 'react-bootstrap';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmptyList.css';

// Redirection
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class EmptyList extends Component {
  static propTypes = {
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  handleClick() {
    history.push('/user/addpayout');
  }

  render() {
    const { siteName } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Panel className={cx(s.panelHeader)} header={formatMessage(messages.payoutMethod)} >
        <div className={cx(s.spaceTop3, s.textCenter)}>
          <span className={s.textTitle}><FormattedMessage {...messages.addPayoutMethod} /></span>
        </div>
        <div className={s.textCenter}>
          <span className={s.textLead}>{siteName} <FormattedMessage {...messages.paymentReleaseInfo1} /></span><br />
          <span className={s.textLead}><FormattedMessage {...messages.paymentReleaseInfo2} /></span>
        </div>
        <div className={cx(s.spaceTop4, s.space2, s.textCenter)}>
          <Link to={"/user/addpayout"} className={cx(s.button, s.btnPrimary)}><FormattedMessage {...messages.addPayout} /></Link>
        </div>
      </Panel>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EmptyList)));