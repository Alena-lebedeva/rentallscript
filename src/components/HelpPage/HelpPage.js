import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Grid,
  Row
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HelpPage.css';
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Images
import block1 from './block1img.jpeg';
import block2 from './block2img.jpeg';
import block3 from './block3img.jpeg';
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
      <Grid fluid>
        <Row>
          <div className={s.root}>
            <div className={s.block}>
              <div className={s.numberStyle}>1</div>
              <div className={s.textBlock}>
                <div className={cx(s.space2, s.titleText)}>
                  <FormattedMessage {...messages.helpFirstTitle} />
                </div>
                <div className={cx(s.space3, s.subText)}>
                  <FormattedMessage {...messages.helpFirstDesc1} />
                </div>
                <div className={cx(s.subText)}>
                  <FormattedMessage {...messages.helpFirstDesc2} />
                </div>
              </div>
              <div className={s.imgBlock}>
                <img className={s.bannerImage} src={block1} />
              </div>
            </div>
            <div className={s.block}>
              <div className={s.secondBlock}>
                <div className={cx(s.leftImage, s.imgBlock)}>
                  <img className={s.bannerImage} src={block2} />
                </div>
              </div>
              <div className={s.numberStyle}>2</div>
              <div className={s.textBlock}>
                <div className={cx(s.space2, s.titleText, s.titleTextChild)}>
                  <FormattedMessage {...messages.helpSecondTitle} />
                </div>
                <div className={cx(s.space3, s.subText)}>
                  <FormattedMessage {...messages.helpSecondDesc1} />
                </div>
                <div className={cx(s.space3, s.subText)}>
                  <FormattedMessage {...messages.helpSecondDesc2} />
                </div>
                <div className={cx(s.subText)}>
                  <FormattedMessage {...messages.helpSecondDesc3} />
                </div>
              </div>
              <div className={cx(s.space3, "hidden-md hidden-lg")}>
                <div className={cx(s.leftImage, s.imgBlock)}>
                  <img className={cx(s.smBottom, s.bannerImage)} src={block2} />
                </div>
              </div>
            </div>

            <div className={(s.block)}>
              <div className={s.numberStyle}>3</div>
              <div className={s.textBlock}>
                <div className={cx(s.space2, s.titleText, s.titleTextChild)}>
                  <FormattedMessage {...messages.helpThirdTitle} />
                </div>
                <div className={cx(s.space3, s.subText)}>
                  <FormattedMessage {...messages.helpThirdDesc1} />
                </div>
                <div className={cx(s.space3, s.subText)}>
                  <FormattedMessage {...messages.helpThirdDesc2} />
                </div>
                <div className={cx(s.subText)}>
                  <FormattedMessage {...messages.helpThirdDesc3} />
                </div>
              </div>
              <div className={cx(s.imgBlock, s.secondBlock, "hidden-md hidden-lg")}>
                <img className={s.bannerImage} src={block3} />
              </div>
              <div className={cx("hidden-md hidden-lg")}>
                <div className={cx(s.leftImage, s.imgBlock)}>
                  <img className={s.bannerImage} src={block3} />
                </div>
              </div>
              <div className={cx(s.imgBlock, s.secondBlock)}>
                <img className={s.bannerImage} src={block3} />
              </div>
            </div>
          </div>
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
