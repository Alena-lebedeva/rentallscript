import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
    Row,
    Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import Avatar from '../Avatar';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class ResponseItem extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        data: PropTypes.shape({
            authorData: PropTypes.shape({
                picture: PropTypes.string,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                profileId: PropTypes.number.isRequired,
            }),
        }),
    };

    render() {
        const { data: { authorData: { firstName, lastName, profileId, picture } } } = this.props;
        const { data: { reviewContent }, otherUserResponse } = this.props;
        return (
            <div>
                <div className={cx(s.reviewBody, s.pullLeft)}>
                    <Avatar
                        source={picture}
                        height={34}
                        width={34}
                        title={firstName}
                        className={s.profileAvatar}
                        withLink
                        linkClassName={cx(s.avatarDisplay, s.profileAvatarLink)}
                        profileId={profileId}
                    />
                </div>
                <div className={s.reviewBody}>
                    <span className={s.textBold}><FormattedMessage {...messages.responseFrom} />{' '}{firstName}:</span>
                    <p>
                        {
                            reviewContent
                        }
                    </p>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(ResponseItem);