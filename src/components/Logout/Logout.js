import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

// import s from './NavigationAfterLogin.css';
import { Button } from 'react-bootstrap';

// Locale
import messages from '../../locale/messages';
class Logout extends React.Component {

  static propTypes = {};

  render() {
    const { className } = this.props;
    return (
      <li className={className}>
        <form action="/logout" method="post">
          <Button type="submit" bsStyle="link">
            <FormattedMessage {...messages.logout} />
          </Button>
        </form>
      </li>
    );
  }

}

export default Logout;
