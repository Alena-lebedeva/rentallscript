// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import * as FontAwesome from 'react-icons/lib/fa'
import cx from 'classnames';
import {
  Navbar
} from 'react-bootstrap';

// Internal Components
import AdminNavigation from '../siteadmin/AdminNavigation';
import Logo from '../Logo';

// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';

class AdminHeader extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool
  };

  static defaultProps = {
    borderLess: false
  }

  render() {
    const { siteSettings, borderLess } = this.props;
    let borderClass;
    if (borderLess) {
      borderClass = s.rentAllHeaderBorderLess;
    }
    return (
      <div className={s.root}>
        <Toaster />
        <LoadingBar />
        <div className={s.container}>
          <Navbar fluid className={cx(s.rentAllHeaderAdmin, 'rentAllAdminHeader', 'rentallAdminHeaderNoBorder')} collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand className={cx('hidden-xs')}>
                <Logo link={"/siteadmin"} className={cx(s.brandAdmin, s.brandImg)} />
              </Navbar.Brand>
              <Navbar.Toggle className={s.navBarToggle} children={
                <span>
                  <Logo link={"/siteadmin"} className={cx(s.brand, s.brandImgToggle)} />
                  <FontAwesome.FaChevronDown />
                </span>
              } />
            </Navbar.Header>
            <Navbar.Collapse>
              <AdminNavigation />
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminHeader));
