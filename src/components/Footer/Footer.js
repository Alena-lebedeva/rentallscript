import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { graphql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import LanguageSwitcher from '../LanguageSwitcher';
import CurrencySwitcher from '../CurrencySwitcher';
import Link from '../Link';
import BannerImage from './Banner.jpg';

import PlayStoreImage from './playStore.png';
import AppStoreImage from './appStore.png';

// Locale
import messages from '../../locale/messages';

import getEnabledBlog from './getEnabledBlog.graphql';

class Footer extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    appAvailableStatus: PropTypes.bool,
    playStoreUrl: PropTypes.string,
    appStoreUrl: PropTypes.string,
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getEnabledBlog: PropTypes.array,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      rentall: false,
      hosting: false,
      discover: false,
    }
  }


  componentWillReceiveProps(nextProps) {
    const { data: { getEnabledBlog } } = nextProps;
    getEnabledBlog && getEnabledBlog.length > 0 && getEnabledBlog.map((item) => {
      if (item.footerCategory == 'RentALL') {
        this.setState({ rentall: true })
      }
      if (item.footerCategory == 'discover') {
        this.setState({ discover: true })
      }
      if (item.footerCategory == 'hosting') {
        this.setState({ hosting: true })
      }
    });
  }

  render() {
    const { siteName, facebook, twitter, instagram, appAvailableStatus, playStoreUrl, appStoreUrl } = this.props;
    const { data: { getEnabledBlog } } = this.props;
    const { rentall, discover, hosting } = this.state;
    return (
      <div className={s.positionRelative}>
        <div
          className={cx(s.topImageBanner, s.root)}
          style={{ backgroundImage: `url(${BannerImage})` }}
        >
          <div className={s.container}>
            <div className={cx(s.footerSectionContainer, 'hidden-print')}>
              <Grid fluid>
                <Row>
                  <div className={s.responsivePadding}>
                    <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddingMobile)}>
                      <label className={s.landingLabel}>{siteName}</label>
                      <ul className={s.listContainer}>
                        <li>
                          <Link to={'/about'} className={s.textLink} >
                            <FormattedMessage {...messages.about} />
                          </Link>
                        </li>
                        <li>
                          <Link to={'/contact'} className={s.textLink} >
                            <FormattedMessage {...messages.contactForm} />
                          </Link>
                        </li>
                        {
                          rentall && getEnabledBlog && getEnabledBlog.length > 0 && getEnabledBlog.map((item) => {
                            if (item.footerCategory == 'RentALL') {
                              return (
                                <li>
                                  <Link to={'/page/' + item.pageUrl} className={s.textLink} >
                                    {item.pageTitle}
                                  </Link>
                                </li>
                              )
                            }
                          })
                        }
                      </ul>
                    </Col>
                    <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddingMobile)}>
                      <label className={s.landingLabel}><FormattedMessage {...messages.discover} /></label>
                      <ul className={s.listContainer}>
                        <li>
                          <Link to={'/safety'} className={s.textLink} >
                            <FormattedMessage {...messages.trustSafety} />
                          </Link>
                        </li>
                        <li>
                          <Link to={'/travel'} className={s.textLink} >
                            <FormattedMessage {...messages.travelCredit} />
                          </Link>
                        </li>
                        {
                          discover && getEnabledBlog && getEnabledBlog.length > 0 && getEnabledBlog.map((item) => {
                            if (item.footerCategory == 'discover') {
                              return (
                                <li>
                                  <Link to={'/page/' + item.pageUrl} className={s.textLink} >
                                    {item.pageTitle}
                                  </Link>
                                </li>
                              )
                            }
                          })
                        }
                      </ul>
                    </Col>
                    <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddingMobile)}>
                      <label className={s.landingLabel}><FormattedMessage {...messages.hosting} /></label>
                      <ul className={s.listContainer}>
                        <li>
                          <Link to={'/whyhost'} className={s.textLink} >
                            <FormattedMessage {...messages.becomeAHost} />
                          </Link>
                        </li>
                        <li>
                          <Link to={'/privacy'} className={s.textLink} >
                            <FormattedMessage {...messages.termsPrivacy} />
                          </Link>
                        </li>
                        {
                          hosting && getEnabledBlog && getEnabledBlog.length > 0 && getEnabledBlog.map((item) => {
                            if (item.footerCategory == 'hosting') {
                              return (
                                <li>
                                  <Link to={'/page/' + item.pageUrl} className={s.textLink} >
                                    {item.pageTitle}
                                  </Link>
                                </li>
                              )
                            }
                          })
                        }
                      </ul>
                    </Col>
                    <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddingMobile)}>
                      {
                        appAvailableStatus == 1 && (playStoreUrl || appStoreUrl) &&
                          <div>
                            <label className={cx(s.landingLabel, s.space3)}><FormattedMessage {...messages.appsAvailableOn} /></label>
                            <div>
                              {
                                playStoreUrl && <a href={playStoreUrl} target="_blank" className={s.displayInlineBlock}>
                                  <img alt="Image" src={PlayStoreImage} className={s.anroidImg} />
                                </a>
                              }
                              {
                                appStoreUrl && <a href={appStoreUrl} target="_blank" className={s.displayInlineBlock}>
                                  <img alt="Image" src={AppStoreImage} className={s.iosImg} />
                                </a>
                              }
                            </div>
                          </div>
                      }
                    </Col>
                  </div>
                </Row>

                <Row className={cx(s.copyrightSection, s.spaceTop4, s.copyRightTabNoMargin)}>
                  <Col xs={6} sm={4} md={4} lg={4} className={s.noPaddingMobile}>
                    <span className={s.text}>© {siteName}.</span>
                  </Col>
                  <Col xs={6} sm={8} md={8} lg={8} className={s.noPaddingMobile}>
                    {
                      instagram && <a href={instagram} target="_blank" className={cx(s.shareIcon)}>
                        <FontAwesome.FaInstagram />
                      </a>
                    }
                    {
                      twitter && <a href={twitter} target="_blank" className={cx(s.shareIcon)}>
                        <FontAwesome.FaTwitter />
                      </a>
                    }
                    {
                      facebook && <a href={facebook} target="_blank" className={cx(s.shareIcon)}>
                        <FontAwesome.FaFacebook />
                      </a>
                    }
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapState = state => ({
  siteName: state.siteSettings.data.siteName,
  facebook: state.siteSettings.data.facebookLink,
  twitter: state.siteSettings.data.twitterLink,
  instagram: state.siteSettings.data.instagramLink,
  appAvailableStatus: state.siteSettings.data.appAvailableStatus,
  playStoreUrl: state.siteSettings.data.playStoreUrl,
  appStoreUrl: state.siteSettings.data.appStoreUrl
});

const mapDispatch = {};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getEnabledBlog,
    {
      options: {
        fetchPolicy: 'network-only',
        ssr: false
      }
    }),
)(Footer);
