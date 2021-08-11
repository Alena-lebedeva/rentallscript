import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';
import {
    Form,
    Table
} from 'react-bootstrap';


import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfileVerifiedView.css';
import * as FontAwesome from 'react-icons/lib/fa';
import Link from '../../Link';

// Send Email
import { sendEmail } from '../../../core/email/sendEmail';

import Avatar from '../../Avatar';

const query = gql`query($profileId: Int, $isUser: Boolean) {
    showUserProfile(profileId: $profileId, isUser: $isUser) {
      userId
      profileId
      firstName
      lastName
      dateOfBirth
      gender
      phoneNumber
      preferredLanguage
      preferredCurrency
      location
      info
      createdAt
      picture
      reviewsCount
      country
      profileBanStatus{
        email
      }
      userVerifiedInfo{
        isEmailConfirmed
        isIdVerification
        isGoogleConnected
        isFacebookConnected
        isPhoneVerified
      }
    }
  }`;

class ProfileVerifiedView extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        title: PropTypes.string.isRequired,
        addListToRecommended: PropTypes.any.isRequired,
        removeListFromRecommended: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: {
            profileBanStatus: null,
            userVerifiedInfo: null
        }
    }

    constructor(props) {
        super(props);
    }


    render() {
        const { data, intl, title } = this.props;
        let isVerifiedInfo = data && data.userVerifiedInfo;
        let isVerify = (data && data.userVerifiedInfo) && (data.userVerifiedInfo.isEmailConfirmed || data.userVerifiedInfo.isGoogleConnected || data.userVerifiedInfo.isIdVerification || data.userVerifiedInfo.isFacebookConnected || data.userVerifiedInfo.isPhoneVerified) ? true : false;

        let isEmail, isGoogle, isDocument, isFacebook, isSMS;

        if (isVerifiedInfo && data.userVerifiedInfo.isEmailConfirmed == true) {
            isEmail = "Email";
        }
        if (isVerifiedInfo && data.userVerifiedInfo.isGoogleConnected == true) {
            isGoogle = "Google";
        }

        if (isVerifiedInfo && data.userVerifiedInfo.isFacebookConnected == true) {
            isFacebook = "Facebook";
        }

        if (isVerifiedInfo && data.userVerifiedInfo.isIdVerification == true) {
            isDocument = "Document";
        }

        if (isVerifiedInfo && data.userVerifiedInfo.isPhoneVerified == true) {
            isSMS = "SMS";
        }

        let language;

        if (data.preferredLanguage == "id") {
            language = "Bahasa Indonesia"
        } else if (data.preferredLanguage == "ms") {
            language = "Bahasa Melayu"
        } else if (data.preferredLanguage == "ca") {
            language = "Català"
        } else if (data.preferredLanguage == "da") {
            language = "Dansk"
        } else if (data.preferredLanguage == "de") {
            language = "Deutsch"
        } else if (data.preferredLanguage == "en") {
            language = "English"
        } else if (data.preferredLanguage == "es") {
            language = "Español"
        } else if (data.preferredLanguage == "el") {
            language = "Eλληνικά"
        } else if (data.preferredLanguage == "fr") {
            language = "Français"
        } else if (data.preferredLanguage == "it") {
            language = "Italiano"
        } else if (data.preferredLanguage == "hu") {
            language = "Magyar"
        } else if (data.preferredLanguage == "nl") {
            language = "Nederlands"
        } else if (data.preferredLanguage == "no") {
            language = "Norsk"
        } else if (data.preferredLanguage == "pl") {
            language = "Polski"
        } else if (data.preferredLanguage == "pt") {
            language = "Português"
        } else if (data.preferredLanguage == "fi") {
            language = "Suomi"
        } else if (data.preferredLanguage == "sv") {
            language = "Svenska"
        } else if (data.preferredLanguage == "tr") {
            language = "Türkçe"
        } else if (data.preferredLanguage == "is") {
            language = "Íslenska"
        } else if (data.preferredLanguage == "cs") {
            language = "Čeština"
        } else if (data.preferredLanguage == "ru") {
            language = "Русский"
        } else if (data.preferredLanguage == "th") {
            language = "ภาษาไทย"
        } else if (data.preferredLanguage == "zh") {
            language = "中文 (简体)"
        } else if (data.preferredLanguage == "zh-TW") {
            language = "中文 (繁體)"
        } else if (data.preferredLanguage == "ja") {
            language = "日本語"
        } else {
            language = "한국어"
        }


        return (
            <div className={cx(s.pagecontentWrapper)}>
                <div className={s.contentBox}>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={cx('table-responsive')}>

                        <Link
                            to={"/siteadmin/users"}
                            className={cx('pull-right', s.goBackLink)}
                        >
                            Go back
                        </Link>

                        <Table>
                            <tbody>
                                <tr>
                                    <td className={'table-width'}>Profile Picture</td>
                                    {
                                        data && data.picture && <td>
                                            <img
                                                src={"/images/avatar/" + data.picture}
                                                width="110"
                                                height="auto"
                                            />
                                        </td>
                                    }
                                    {
                                        !data.picture && <td>
                                            <Avatar
                                                isUser
                                                height={200}
                                                width={200}
                                                className={s.profileAvatar}
                                            />
                                        </td>
                                    }
                                </tr>
                                <tr>
                                    <td className={'table-width'}>First Name</td>
                                    <td>{data.firstName}</td>
                                </tr>
                                <tr>
                                    <td className={'table-width'}>Last Name</td>
                                    <td>{data.lastName}</td>
                                </tr>
                                {
                                    data && data.dateOfBirth && <tr>
                                        <td className={'table-width'}>Date of birth </td>
                                        <td>{data.dateOfBirth}</td>
                                    </tr>
                                }
                                {
                                    data && data.gender && <tr>
                                        <td className={'table-width'}>Gender</td>
                                        <td>{data.gender}</td>
                                    </tr>
                                }
                                {
                                    data && data.profileBanStatus.email && <tr>
                                        <td className={'table-width'}>Email</td>
                                        <td>{data.profileBanStatus.email}</td>
                                    </tr>
                                }
                                {
                                    data && data.phoneNumber && <tr>
                                        <td className={'table-width'}>Phone Number</td>
                                        <td>{data.phoneNumber}</td>
                                    </tr>
                                }
                                {
                                    data && data.preferredLanguage && <tr>
                                        <td className={'table-width'}>Language</td>
                                        <td>{language}</td>
                                    </tr>
                                }
                                {
                                    data && data.preferredCurrency && <tr>
                                        <td className={'table-width'}>Currency</td>
                                        <td>{data.preferredCurrency}</td>
                                    </tr>
                                }
                                {
                                    data && data.info && <tr>
                                        <td className={'table-width'}>Bio Info</td>
                                        <td>{data.info}</td>
                                    </tr>
                                }
                                {
                                    data && data.location && <tr>
                                        <td className={'table-width'}>Location</td>
                                        <td>{data.location}</td>
                                    </tr>
                                }
                                {
                                    isVerify && <tr>
                                        <td className={'table-width'}>Verification</td>
                                        {
                                            <td>
                                                <tr>
                                                    <td>{isEmail} </td>
                                                </tr>
                                                <tr>
                                                    <td>{isGoogle} </td>
                                                </tr>
                                                <tr>
                                                    <td>{isDocument} </td>
                                                </tr>
                                                <tr>
                                                    <td>{isFacebook} </td>
                                                </tr>
                                                <tr>
                                                    <td>{isSMS} </td>
                                                </tr>
                                            </td>
                                        }
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }

}


export default compose(
    withStyles(s)
)(ProfileVerifiedView);






