import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Inbox.css';

// Locale
import messages from '../../../locale/messages';

class EmptyInbox extends React.Component {
  render() {
    return (
      <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4} lg={4} lgOffset={4} className={cx(s.space5, s.spaceTop5, s.textCenter)}>
        <h3 className={s.textLead}>
          <FormattedMessage {...messages.noMessagesTitle} />
        </h3>
        <p className={s.textMuted}>
          <span>
            <FormattedMessage {...messages.noMessagesTitle1} />
          </span>
        </p>
      </Col>
    );
  }
}

export default withStyles(s)(EmptyInbox);
