import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MoreSection.css';
//Image
import host1 from './1.jpg';
import host2 from './2.jpg';
import host3 from './3.jpg';

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
        <Row className={s.moresection}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h3 className={s.mobilehead}>More about hosting</h3>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} className={s.moresblock}>
              <div className={s.mbimage} style={{ backgroundImage: `url(${host1})` }} >

              </div>
              <div className={s.mbcontent}>
                <a href="#">
                  <span className={s.hostheading}>Lorem ipsum </span>
                  <span className={s.tagline}>Ut enim ad minim veniam</span>
                  {/* <span className={s.moreBtn}>Learn more</span> */}
                </a>
              </div>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} className={s.moresblock}>
              <div className={s.mbimage} style={{ backgroundImage: `url(${host2})` }}>

              </div>
              <div className={s.mbcontent}>
                <a href="#">
                  <span className={s.hostheading}>Lorem ipsum </span>
                  <span className={s.tagline}>Ut enim ad minim veniam</span>
                  {/* <span className={s.moreBtn}>Learn more</span> */}
                </a>
              </div>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} className={s.moresblock}>
              <div className={s.mbimage} style={{ backgroundImage: `url(${host3})` }}>

              </div>
              <div className={s.mbcontent}>
                <a href="#">
                  <span className={s.hostheading}>Lorem ipsum </span>
                  <span className={s.tagline}>Ut enim ad minim veniam</span>
                  {/* <span className={s.moreBtn}>Learn more</span> */}
                </a>
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
