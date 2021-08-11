import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenu.css';
import {
  Button,
  Col,
  FormGroup
} from 'react-bootstrap';
import cx from 'classnames';

// Locale
import messages from '../../../locale/messages';

// Component 
import Link from '../../Link';
import history from '../../../core/history';

class SideMenu extends React.Component {
  static propTypes = {};

  handleClick() {
    history.push('/become-a-host');
  }

  render() {

    return (
      <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
        <ul className={s.listContainer}>
          <li>
            <Link to={'/rooms'} className={s.sideNavitem}>
              <FormattedMessage {...messages.yourListings} />
            </Link>
          </li>
          <li>
            <Link to={'/reservation/current'} className={s.sideNavitem}>
              <FormattedMessage {...messages.upcomingReservations} />
            </Link>
          </li>
          <li>
            <Link to={'/reservation/previous'} className={s.sideNavitem}>
              <FormattedMessage {...messages.previousReservations} />
            </Link>
          </li>
        </ul>
        <Col xs={12} sm={11} md={12} lg={7} className={cx(s.noPadding, s.space2, s.spaceTop2)} >
          <FormGroup className={s.formGroup}>
            <Button
              className={cx(s.button, s.btnPrimary, s.sideMenuBtn)}
              onClick={this.handleClick}
            >
              <FormattedMessage {...messages.addListing} />
            </Button>
          </FormGroup>
        </Col>
      </Col>
    );
  }
}

export default withStyles(s)(SideMenu);
