import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Image
} from 'react-bootstrap';

import cx from 'classnames';
import s from './SocialLogin.css';
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';
import googleIcon from './googleIcon.png'
class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string
  };

  render() {
    const { refer } = this.props;
    let FbURL = '/login/facebook';
    let GoogleURL = '/login/google';
    if (refer) {
      FbURL = '/login/facebook?refer=' + refer;
      GoogleURL = '/login/google?refer=' + refer;
    }

    return (
      <div>
        <div className={s.formGroup}>
          <a className={s.facebook} href={FbURL}>
            <svg
              className={s.icon}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
              />
            </svg>
            <FormattedMessage {...messages.facebookLogin} />
          </a>
        </div>

        <div className={s.formGroup}>
          <a className={cx(s.google)} href={GoogleURL}>
            <div className={s.googleIcon}>
              <Image src={googleIcon} responsive />
            </div>
            <FormattedMessage {...messages.googleLogin} />
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SocialLogin);
