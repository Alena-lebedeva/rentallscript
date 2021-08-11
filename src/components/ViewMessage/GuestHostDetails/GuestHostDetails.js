import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import { injectIntl } from 'react-intl';
// Helper
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';

import {
  Image,
} from 'react-bootstrap';

// Component
import Link from '../../Link';
import chatIcon from './chat.png';
import defaultPic from './defaultPic.png';

class GuestHostDetails extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    location: PropTypes.string,
    reviewsCount: PropTypes.number,
    verifications: PropTypes.shape({
      isEmailConfirmed: PropTypes.bool,
      isFacebookConnected: PropTypes.bool,
      isGoogleConnected: PropTypes.bool,
    }),
  };

  render() {
    const { userType, threadId, getThread, account } = this.props;

    let guestImageData = getThread && getThread.guestProfile.picture;
    let guestFirstName = getThread && getThread.guestProfile.firstName;
    let guestProfileNumber = getThread && getThread.guestProfile.profileId;
    let hostImageData = getThread && getThread.hostProfile.picture;
    let hostFirstName = getThread && getThread.hostProfile.firstName;
    let hostProfileNumber = getThread && getThread.hostProfile.profileId;

    let hosName = userType == 'host' ? capitalizeFirstLetter(hostFirstName) : capitalizeFirstLetter(guestFirstName);
    let guestName = userType != 'host' ? capitalizeFirstLetter(hostFirstName) : capitalizeFirstLetter(guestFirstName);
    let hostImage = userType == 'host' ? hostImageData : guestImageData;
    let guestImage = userType != 'host' ? hostImageData : guestImageData;
    let hostProfileId = userType == 'host' ? hostProfileNumber : guestProfileNumber;
    let guestProfileId = userType != 'host' ? hostProfileNumber : guestProfileNumber;


    return (
      <div className={s.guestHost}>
        <div className={cx(s.hostName, 'hostNameColor')}>
          <Link to={'/users/show/' + guestProfileId} >
            {guestName}
          </Link>
        </div>
        <div className={s.hostChat}>
          <Link to={'/users/show/' + guestProfileId}>
            {
              guestImage && <Image src={'/images/avatar/medium_' + guestImage} responsive />
            }
            {
              !guestImage && <Image src={defaultPic} responsive />
            }

          </Link>
        </div>
        <div className={s.centerChatIcon}>
          <div className={s.iconBG}>
            <Image src={chatIcon} responsive />
          </div>
        </div>
        <div className={s.hostChat}>
          <Link to={'/users/show/' + hostProfileId}>
            {/* <Image src={'/images/avatar/medium_' + hostImage} responsive /> */}
            {
              hostImage && <Image src={'/images/avatar/medium_' + hostImage} responsive />
            }
            {
              !hostImage && <Image src={defaultPic} responsive />
            }
          </Link>
        </div>
        <div className={cx(s.hostName, 'hostNameColor')}>
          <Link to={'/users/show/' + hostProfileId}>
            {hosName}
          </Link>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(GuestHostDetails));

