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
import s from './CoverSection.css';
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
        <Row className={s.coveredsection}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.seperator, s.boxseperator)}></div>
            <div className={s.mainhedding}>
              <h1>{data && data.coverSectionTitle1}</h1>
            </div>
            <Col xs={12} sm={12} md={6} lg={6} className={s.coveredtextarea}>
              <p className={s.common}>{data && data.coverSectionContent1}</p>
              <p className={s.common}>{data && data.coverSectionContent2}</p>
              {/* <a href="#">Lorem ipsum dolor sit amet</a> */}
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <ul className={s.coverul}>
                <li>{data && data.coverSectionFeature1}</li>
                <li>{data && data.coverSectionFeature2}</li>
                <li>{data && data.coverSectionFeature3}</li>
                <li>{data && data.coverSectionFeature4}</li>
                <li>{data && data.coverSectionFeature5}</li>
                <li>{data && data.coverSectionFeature6}</li>
              </ul>
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
