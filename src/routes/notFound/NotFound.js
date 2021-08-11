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
import s from './NotFound.css';

// Components
import Link from '../../components/Link';

// Locale
import messages from '../../locale/messages';

class NotFound extends React.Component {
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
              <h1 className={cx(s.textJumbo, 'hidden-xs', 'hidden-sm')}><FormattedMessage {...messages.notFoundTitle} /></h1>
              <h1 className={cx(s.textMedium, 'visible-xs', 'visible-sm')}><FormattedMessage {...messages.notFoundTitle} /></h1>
              <h2><FormattedMessage {...messages.notFoundSubTitle} /></h2>
              <span className={s.subTitle}><FormattedMessage {...messages.errorCode} /></span>
              <ul className={cx(s.spaceTop2, s.listStyled)}>
                <li className={s.space2}>
                  <span><FormattedMessage {...messages.linksTitle} /></span>
                </li>
                <li>
                  <Link to={"/"}><FormattedMessage {...messages.home} /></Link>
                </li>
                <li>
                  <Link to={"/s"}><FormattedMessage {...messages.search} /></Link>
                </li>
                <li>
                  <Link to={"/help"}><FormattedMessage {...messages.help} /></Link>
                </li>
                <li>
                  <Link to={"/whyhost"}><FormattedMessage {...messages.hostingOn} /> {siteName}</Link>
                </li>
                <li>
                  <Link to={"/safety"}><FormattedMessage {...messages.trustSafety} /></Link>
                </li>
              </ul>
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

export default withStyles(s)(connect(mapState, mapDispatch)(NotFound));
