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
import s from './PaymentContent.css';
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

    return (
      <Grid>
        <Row className={s.Paymentsection}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.seperator, s.boxseperator)}></div>
            <div className={s.mainhedding}>
              <h1>{data && data.paymentTitleHeading}</h1>
            </div>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <h4 className={s.common}>{data && data.paymentTitle1}</h4>
                <p className={s.common}>{data && data.paymentContent1}</p>
              </div>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <h4 className={s.common}>{data && data.paymentTitle2}</h4>
                <p className={s.common}>{data && data.paymentContent2}</p>
              </div>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4}>
              <div className={s.steps}>
                <h4 className={s.common}>{data && data.paymentTitle3}</h4>
                <p className={s.common}>{data && data.paymentContent3}</p>
                {/* <a href="#">Lorem ipsum dolor sit amet</a> */}
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

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
