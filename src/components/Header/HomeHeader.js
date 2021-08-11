// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Redux Form
import {  reduxForm } from 'redux-form';
// Translation
import { injectIntl } from 'react-intl';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import cx from 'classnames';
import {
  Navbar
} from 'react-bootstrap';

// Internal Components
import Link from '../Link';
import Navigation from '../Navigation';
import Logo from '../Logo';

// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';
import HeaderLocationSearch from './HeaderLocationSearch';

// Redux action
import { toggleOpen, toggleClose } from '../../actions/Menu/toggleControl';

import history from '../../core/history';

class HomeHeader extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool,
    showMenu: PropTypes.bool,
    toggleOpen: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    checked: PropTypes.any,
  };

  static defaultProps = {
    borderLess: false,
    showMenu: false,
    searchDisablePages: [
      '/',
      '/home'
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      searchHide: true,
      load: false,
      isOpen: 0,
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleDisableSearchPages = this.handleDisableSearchPages.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openClose = this.openClose.bind(this);
  }

  componentDidMount() {
    this.setState({
      load: true
    });
    this.handleDisableSearchPages();
  }

  componentWillReceiveProps(nextProps) {
    this.handleDisableSearchPages();
  }

  handleMenu() {
    const { showMenu, toggleOpen, toggleClose } = this.props;
    if (showMenu) {
      toggleClose();
    } else {
      toggleOpen();
    }
  }

  handleDisableSearchPages() {
    const { searchDisablePages } = this.props;
    let location = history.location ? history.location.pathname : null;
    let searchHide = false;
    if (location && searchDisablePages.length > 0) {
      searchHide = searchDisablePages.find((o) => location === o);
      searchHide = (searchHide) ? true : false;
    }
    this.setState({
      searchHide
    })
  }
  async openMenu() {
    this.setState({
      isOpen: 1,
    })
     if(this.state.isOpen == 0){
      document.body.classList.add('menu-open');
    }
    
  }

  async openClose() {
    
    this.setState({
      isOpen: 0,
    })
    if(this.state.isOpen == 1){
      document.body.classList.remove('menu-open');
    }
  }
  render() {
    const { siteSettings, borderLess, showMenu, toggleOpen, layoutType } = this.props;
    const { searchHide, load } = this.state;
    let borderClass, headerDesignClass;
    let location;
    if (borderLess) {
      borderClass = s.rentAllHeaderBorderLess;
    }

    if (layoutType && (layoutType != 2)) {
      headerDesignClass = 'headerNewDesign';
    }

    if (history.location) {
      location = history.location.pathname;
    }

    if (!load) {
      return (
        <div className={cx(headerDesignClass)}>
          <div className={s.root} key={new Date().getTime()}>
          <Toaster />
          <LoadingBar />
          <div className={s.container}>
            <Navbar fluid className={cx(s.rentAllHeader, 'rentAllHeader', borderClass, { [s.fixedHeader]: location === '/s' }, { ['homeHeader']: location === '/' || location === '/home' })}
              expanded={showMenu} onToggle={this.handleMenu}>
              <Navbar.Header className={cx('logoPadding', !showMenu ? 'normalPosition' : 'fixedPosition')}>
                <Navbar.Brand>
                  <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
                </Navbar.Brand>
                {/* <Navbar.Toggle className={s.navBarToggle}
                  children={
                    <span className={cx(layoutType == 2 ? 'menuToggleOne' : 'menuToggle')}>
                      <input type="checkbox" checked={showMenu} />
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  }
                /> */}
                <div onClick={() => this.openMenu()}>
                 <div className={'hidden-lg hamburgerButton'}>
                  <span className={cx(layoutType == 2 ? 'menuToggleOne' : 'menuToggle')}>

                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                </div>
              </Navbar.Header>

              {/* <Navbar.Collapse className={'location'}>
                {
                  !searchHide && <Navbar.Form pullLeft className={('hidden-xs', s.breakPoint)}>
                    <HeaderLocationSearch />
                  </Navbar.Form>
                }
                <Navigation />
              </Navbar.Collapse> */}
            
              <div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.mobileMenu)}>
              <div className={cx({ [s.menuClose]: this.state.isOpen == 0 }, s.rightMenuClose, 'hidden-lg')}>
              <div className={s.closeButtonPosition}>
                <div className={s.closeColor} onClick={() => this.openClose()} >
                  ×
              </div>
              </div>
              </div>
              {
                  !searchHide && <Navbar.Form pullLeft className={('hidden-xs', s.breakPoint)}>
                    <HeaderLocationSearch />
                  </Navbar.Form>
                }
                <div onClick={() => this.openClose()}>
                <Navigation openClose={this.state.isOpen} />
                </div>
              </div>
            </Navbar>
          </div>
          </div>
        </div>
      );
    }

    return (
      <div className={cx(headerDesignClass)}>
        <div className={s.root}>
          <Toaster />
          <LoadingBar />
          <div className={s.container}>
            <Navbar fluid className={cx(s.rentAllHeader, 'rentAllHeader', borderClass, 
            { [s.fixedHeader]: location === '/s' }, { ['homeHeader']: location === '/' || location === '/home' })}
              expanded={showMenu} onToggle={this.handleMenu}>
              <Navbar.Header className={cx('logoPadding', !showMenu ? 'normalPosition' : 'fixedPosition')}>
                <Navbar.Brand>
                  <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
                </Navbar.Brand>
                {/* <Navbar.Toggle className={s.navBarToggle}
                  children={
                    <span className={cx(layoutType == 2 ? 'menuToggleOne' : 'menuToggle')}>
                      <input type="checkbox" checked={showMenu} />
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  }
                /> */}
                <div onClick={() => this.openMenu()}>
                 <div className={'hidden-lg hamburgerButton'}>
                  <span className={cx(layoutType == 2 ? 'menuToggleOne' : 'menuToggle')}>

                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                </div>
              </Navbar.Header>

              {/* <Navbar.Collapse className={'location'}>
                {
                  !searchHide && <Navbar.Form pullLeft className={('hidden-xs', s.breakPoint)}>
                    <HeaderLocationSearch />
                  </Navbar.Form>
                }
                <Navigation />
              </Navbar.Collapse> */}
            
              <div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.mobileMenu, 'homeMobileMenu')}>
              <div className={cx({ [s.menuClose]: this.state.isOpen == 0 }, s.rightMenuClose, 'hidden-lg')}>
              <div className={s.closeButtonPosition}>
                <div className={s.closeColor} onClick={() => this.openClose()} >
                  ×
              </div>
              </div>
              </div>
              {
                  !searchHide && <Navbar.Form pullLeft className={('hidden-xs', s.breakPoint)}>
                    <HeaderLocationSearch />
                  </Navbar.Form>
                }
                <div onClick={() => this.openClose()}>
                <Navigation openClose={this.state.isOpen} />
                </div>
              </div>
            </Navbar>
          </div>
        </div>
      </div>
    );
  }
}

HomeHeader = reduxForm({
  form: 'HomeHeaderForm', // a unique name for this form
})(HomeHeader);

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
  showMenu: state.toggle.showMenu,
  layoutType: state.siteSettings.data.homePageType
});

const mapDispatch = {
  toggleOpen,
  toggleClose
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HomeHeader)));
