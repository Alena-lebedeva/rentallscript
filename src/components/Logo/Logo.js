import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '../Link';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logo.css';
import cx from 'classnames';
import history from '../../core/history';

class Logo extends Component {
    static propTypes = {
        siteName: PropTypes.string.isRequired,
        logoImage: PropTypes.string,
        link: PropTypes.string,
        className: PropTypes.string,
        logoHeight: PropTypes.string,
        logoWidth: PropTypes.string,
        showMenu: PropTypes.bool,
    };

    static defaultProps = {
        siteName: null,
        logoImage: null,
        link: '/',
        logoHeight: '34',
        logoWidth: '34',
        showMenu: false
    }

    render() {
        const { siteName, logoImage, link, className, logoHeight, logoWidth, homeLogo, showMenu, homeLogoHeight, homeLogoWidth, layoutType } = this.props;
        let defaultLogoHeight = logoHeight && logoHeight != null ? logoHeight : '63';
        let defaultLogoWidth = logoWidth && logoWidth != null ? logoWidth : '250';
        let defaultHomeLogoHeight = homeLogoHeight && homeLogoHeight != null ? homeLogoHeight : '63';
        let defaultHomeLogoWidth = homeLogoWidth && homeLogoWidth != null ? homeLogoWidth : '63';

        let location = history.location ? history.location.pathname : null;
        if (history.location) {
            location = history.location.pathname;
        }

        return (
            <Link to={link} className={className}>
                {
                    homeLogo && location === '/' && !logoImage && layoutType != 2 &&
                    <img src={"/images/logo/" + homeLogo} className={cx(!showMenu ? 'displayBlock' : 'displayNone')}
                        height={defaultHomeLogoHeight} width={defaultHomeLogoWidth}
                    />
                }
                {
                    homeLogo && location === '/' && !logoImage && showMenu &&
                    <span className={cx(s.logoColor)}>{siteName}</span>
                }
                {
                    homeLogo && location === '/' && logoImage && layoutType != 2 &&
                    <img src={"/images/logo/" + homeLogo} className={cx(!showMenu ? 'displayBlock' : 'displayNone')}
                        height={defaultHomeLogoHeight} width={defaultHomeLogoWidth}
                    />
                }
                {
                    homeLogo && location === '/' && logoImage && layoutType == 2 &&
                    <img src={"/images/logo/" + logoImage} className={cx(!showMenu ? 'displayBlock' : 'displayNone')}
                        height={defaultLogoHeight} width={defaultLogoWidth}
                    />
                }
                {
                    homeLogo && location === '/' && showMenu && logoImage &&
                    <img src={"/images/logo/" + logoImage} height={defaultHomeLogoHeight} width={defaultHomeLogoWidth} />
                }
                {
                    !homeLogo && location === '/' && logoImage &&
                    <img src={"/images/logo/" + logoImage} height={defaultLogoHeight} width={defaultLogoWidth} />
                }
                {
                    !homeLogo && !logoImage && siteName != null && location !== '/' && <span className={cx(s.logoColor)}>{siteName}</span>
                }
                {
                    !homeLogo && !logoImage && siteName != null && location === '/' && <span className={cx(!showMenu ? s.whiteColor : s.logoColor)}>{siteName}</span>
                }
                {
                    !homeLogo && !logoImage && siteName === null && <span className={s.logoColor}>Site Name</span>
                }
                {
                    logoImage && location !== '/' && <img src={"/images/logo/" + logoImage} height={defaultLogoHeight} width={defaultLogoWidth} />
                }
                {
                    !logoImage && homeLogo && location !== '/' && siteName != null && <span className={cx(s.logoColor)}>{siteName}</span>
                }
            </Link>
        );
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    logoImage: state.siteSettings.data.Logo,
    logoHeight: state.siteSettings.data.logoHeight,
    logoWidth: state.siteSettings.data.logoWidth,
    homeLogo: state.siteSettings.data.homeLogo,
    showMenu: state.toggle.showMenu,
    homeLogoHeight: state.siteSettings.data.homeLogoHeight,
    homeLogoWidth: state.siteSettings.data.homeLogoWidth,
    layoutType: state.siteSettings.data.homePageType
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Logo));
