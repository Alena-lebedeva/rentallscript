import React from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Col,
  Panel
} from 'react-bootstrap';

import s from './NoItem.css';

// Internal Helpers
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

class NoItem extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
  };

  handleClick() {
    history.push('/become-a-host');
  }

  render() {

    return (
      <Panel className={cx(s.panelEmpty, 'managelisitinempty')}>
        <Col xs={12} sm={8} md={9} lg={9} className={cx(s.space4, s.panelSpace)}>
          <p className={cx(s.nolistTitle, s.space3)}> <FormattedMessage {...messages.title} /> </p>
          <p>
            <FormattedMessage {...messages.content} />
          </p>
          <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
            <Button
              className={cx(s.button, s.btnPrimary, s.btnlarge, s.spaceTop4, s.spaceRight2)}
              onClick={this.handleClick}
            >
              <FormattedMessage {...messages.button} />
            </Button>
          </Col>
        </Col>
      </Panel>
    );
  }
}

export default injectIntl(withStyles(s)(NoItem));

