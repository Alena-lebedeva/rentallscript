import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyBlock.css';
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName, data } = this.props;
    let FbURL = '/login/facebook';
    let GoogleURL = '/login/google';
    if (refer) {
      FbURL = '/login/facebook?refer=' + refer;
      GoogleURL = '/login/google?refer=' + refer;
    }

    return (
  
          <Grid className={s.whybnb}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
              <Col xs={12} sm={6} md={6} lg={6} className={s.whyblock}>
                <h4 className={s.common}>{data && data.whyBlockTitle1}</h4>
                <p className={s.common}>{data && data.whyBlockContent1}</p>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6} className={s.whyblock}>
                <h4 className={s.common}>{data && data.whyBlockTitle2}</h4>
                <p className={s.common}>{data && data.whyBlockContent2}</p>
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

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
