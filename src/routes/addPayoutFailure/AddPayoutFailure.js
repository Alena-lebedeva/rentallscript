import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import {
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddPayoutFailure.css';

// Components
import Link from '../../components/Link';
import history from '../../core/history';

// Locale
import messages from '../../locale/messages';

import { verifyPayout } from '../../actions/Payout/verifyPayout';

class AddPayoutFailure extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.func,
  };

  handleClick() {
    history.push('/user/addpayout');
  }
  render() {
    const { siteName, currentAccountId, verifyPayout } = this.props;

    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={cx(s.space6, s.spaceTop6)}>
            <Col xs={12} sm={12} md={12} lg={12} className={s.textCenter}>
              <h1 className={cx(s.textJumbo, 'hidden-xs', 'hidden-sm')}>
                <FormattedMessage {...messages.payoutFailure} />
              </h1>
              <h1 className={cx(s.textMedium, 'visible-xs', 'visible-sm')}>
                <FormattedMessage {...messages.payoutFailure} />
              </h1>
              <h2><FormattedMessage {...messages.payoutFailureSubtitle} /></h2>
              <p className={s.marginTop20}><FormattedMessage {...messages.payoutFailureContent} /></p>
              <Col xs={12} sm={12} md={12} lg={12} className={s.marginTop20}>
                <Button
                  className={cx(s.btn, s.btnPrimaryBorder, s.firstBtn)}
                  onClick={() => verifyPayout(currentAccountId)}
                >
                  <FormattedMessage {...messages.payoutRetry} />
                </Button>
                <Button
                  className={cx(s.btn, s.btnPrimary)}
                  onClick={this.handleClick}
                >
                  <FormattedMessage {...messages.addPayout} />
                </Button>
              </Col>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
  verifyPayout
};

export default withStyles(s)(connect(mapState, mapDispatch)(AddPayoutFailure));
