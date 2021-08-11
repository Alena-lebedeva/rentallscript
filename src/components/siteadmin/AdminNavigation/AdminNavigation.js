import React from 'react';
import PropTypes from 'prop-types';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminNavigation.css';
import {
  Nav
} from 'react-bootstrap';

// Internal Components
import NavLink from '../../NavLink';
import Logout from '../../Logout';

class AdminNavigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;
    return (
      <Nav pullRight>
        <NavLink to="/" >
          Go to Main Site
        </NavLink>
        <Logout />
      </Nav>
    );
  }

}

export default withStyles(s)(AdminNavigation);
