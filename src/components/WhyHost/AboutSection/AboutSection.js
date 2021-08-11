import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AboutSection.css';

// Locale
import messages from '../../../locale/messages';


class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName } = this.props;

    return (
      <Grid>
        <Row className={s.aboutbnb}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.seperator, s.boxseperator)}></div>
            <div className={s.mainhedding}>
              <h1><FormattedMessage {...messages.aboutSectiontitle} /></h1>
            </div>
            <Col xs={12} sm={12} md={6} lg={6} className={s.whyblock}>
              <h4 className={s.common}><FormattedMessage {...messages.aboutSectionheading1} /></h4>
              <p className={s.common}><FormattedMessage {...messages.aboutSectiondesc1} /></p>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className={s.whyblock}>
              <h4 className={s.common}><FormattedMessage {...messages.aboutSectionheading2} /></h4>
              <p className={s.common}><FormattedMessage {...messages.aboutSectiondesc2} /></p>
              {/* <a className={s.aboutbnb} href="#">Learn more about experience hosting</a> */}
            </Col>
          </Col>
        </Row>
      </Grid>



    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName

});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
