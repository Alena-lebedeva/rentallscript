import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  Image,
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageBanner.css';
import { url } from '../../../config'

// Images
import centerImage from './fullimage.jpg';
class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName, data } = this.props;
    const img = data && data.coverSectionImage1
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={s.centerimgsection}>
                <Image src={url + '/images/home/' + img} alt="image" responsive />
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
