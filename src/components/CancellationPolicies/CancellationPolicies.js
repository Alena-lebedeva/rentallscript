import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Panel
} from 'react-bootstrap';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancellationPolicies.css';

// Component
import Flexible from './Flexible';
import Moderate from './Moderate';
import Strict from './Strict';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class CancellationPolicy extends React.Component {

  static propTypes = {
    policyType: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  render() {
    const { policyType, siteName } = this.props;
    let policy = policyType;
    if (policyType != 'Flexible' && policyType != 'Moderate' && policyType != 'Strict') {
      policy = 'Flexible'
    }

    return (
      <div>
        <Grid>
          <Row className={s.landingContainer}>
            <h1 className={cx(s.landingTitle, s.space2)}><FormattedMessage {...messages.cancellationPolicies} /></h1>
            <p className={s.textGray}>
              {siteName} <FormattedMessage {...messages.cancellationPoliciesOne} />
              {' '}<FormattedMessage {...messages.cancellationPoliciesTwo} />{' '}
              <FormattedMessage {...messages.cancellationPoliciesThree} />
            </p>
            <Panel className={cx("transactionPanel", s.panelHeader)}
              header={
                <ul className={cx('list-inline', s.noMargin)}>
                  <li className={policy === 'Flexible' ? s.active : ''}>
                    <Link to={"/cancellation-policies/Flexible"} className={s.tabItem}>
                      <FormattedMessage {...messages.flexible} />
                    </Link>
                  </li>
                  <li className={policy === 'Moderate' ? s.active : ''}>
                    <Link to={"/cancellation-policies/Moderate"} className={s.tabItem}>
                      <FormattedMessage {...messages.moderate} />
                    </Link>
                  </li>
                  <li className={policy === 'Strict' ? s.active : ''}>
                    <Link to={"/cancellation-policies/Strict"} className={s.tabItem}>
                      <FormattedMessage {...messages.strict} />
                    </Link>
                  </li>
                </ul>
              }
            >
              {
                policy === 'Flexible' && <Flexible siteName={siteName} />
              }
              {
                policy === 'Moderate' && <Moderate siteName={siteName} />
              }
              {
                policy === 'Strict' && <Strict siteName={siteName} />
              }
            </Panel>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(CancellationPolicy));
