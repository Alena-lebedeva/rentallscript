import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import { injectIntl } from 'react-intl';

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class UserDetail extends Component {
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

  static defaultProps = {
    picture: null,
    displayName: '',
    location: '',
  };

  render() {
    const { profileId, picture, displayName, location, verifications, reviewsCount } = this.props;
    const { formatMessage } = this.props.intl;
    let totalVerification = 0;
    if (verifications) {
      if (verifications.isEmailConfirmed) { totalVerification += 1; }
      if (verifications.isFacebookConnected) { totalVerification += 1; }
      if (verifications.isGoogleConnected) { totalVerification += 1; }
    }
    return (
      <div className={cx(s.sidebarContainer, s.textCenter)}>
        <div className={s.profileAvatarSection}>
          <Avatar
            source={picture}
            height={150}
            width={150}
            title={displayName}
            className={s.profileAvatar}
            withLink
            linkClassName={s.profileAvatarLink}
            profileId={profileId}
          />
        </div>
        <div className={s.spaceTop3}>
          <Link to={"/users/show/" + profileId}><h4 className={s.profileName}>{displayName}</h4></Link>
        </div>
        <div className={cx(s.spaceTop1, s.profileDetail)}>
          <span>{location}</span><br />
          <span>{totalVerification} {totalVerification > 1 ? formatMessage(messages.verifications) : formatMessage(messages.verification)}</span>
          <span>&nbsp;.&nbsp;</span>
          <span>{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(UserDetail));

