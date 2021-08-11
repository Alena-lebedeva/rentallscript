import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './VideoSection.css';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName } = this.props;
    let FbURL = '/login/facebook';
    let GoogleURL = '/login/google';
    if (refer) {
      FbURL = '/login/facebook?refer=' + refer;
      GoogleURL = '/login/google?refer=' + refer;
    }

    return (

      <Grid className={s.whybnb}>
        <Row className={s.videosection}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={cx(s.seperator, s.boxseperator)}></div>
              <div className={s.mainhedding}>
                <h1>Lorem Ipsum </h1>
                <iframe width="100%" height="526" src="https://www.youtube.com/embed/C0DPdy98e4c" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
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
