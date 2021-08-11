import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserBanned.css';
// Components
import Link from '../../components/Link';

// Locale
import messages from '../../locale/messages';

class UserBanned extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.func,
  };

  render() {
    const { siteName } = this.props;
    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={cx(s.space6, s.spaceTop6)}>
            <Col xs={12} sm={12} md={12} lg={12} className={s.textCenter}>
              <h1 className={cx(s.textJumbo, 'hidden-xs', 'hidden-sm')}>
                <FormattedMessage {...messages.userBannedTitle} />
              </h1>
              <h1 className={cx(s.textMedium, 'visible-xs', 'visible-sm')}>
                <FormattedMessage {...messages.userBannedTitle} />
              </h1>
              <h2 className={s.subText}>
                <FormattedMessage {...messages.userBannedSubTitle} />
                <span className={s.subTitle}>
                  <Link to={"/contact"} r>
                    <FormattedMessage {...messages.contactAdmin} />
                  </Link>
                </span>
              </h2>
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

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(UserBanned));
