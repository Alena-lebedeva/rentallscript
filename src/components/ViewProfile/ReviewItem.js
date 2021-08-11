import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import { injectIntl, FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Component
import ResponseItem from './ResponseItem';
import Avatar from '../Avatar';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class ReviewItem extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        picture: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        profileId: PropTypes.number,
        reviewContent: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        response: PropTypes.object,
        location: PropTypes.string,
        isAdmin: PropTypes.bool,
        siteName: PropTypes.string
    };

    static defaultProps = {};

    render() {
        const { firstName, lastName, profileId, picture, location, isAdmin, siteName } = this.props;
        const { reviewContent, createdAt, response } = this.props;
        const { formatMessage } = this.props.intl;
        let date = moment(createdAt).format('MMMM YYYY');
        return (
            <div>
                <div className={s.panelBody}>
                    <div>
                        {
                            !isAdmin && <div className={s.avatarWrapper}>
                                <Avatar
                                    source={picture}
                                    height={68}
                                    width={68}
                                    title={firstName}
                                    className={s.profileAvatar}
                                    withLink
                                    linkClassName={s.profileAvatarLink}
                                    profileId={profileId}
                                />
                                <div className={cx(s.textCenter, s.profileName)}>
                                    <Link to={"/users/show/" + profileId}>{firstName} {lastName}</Link>
                                </div>
                            </div>
                        }
                        {
                            isAdmin && <div className={s.avatarWrapper}>
                                <Avatar
                                    source={'../../../adminAvatar.png'}
                                    height={68}
                                    width={68}
                                    title={formatMessage(messages.verifiedBy) + ' ' + siteName}
                                    className={cx(s.profileAvatar, s.noBackground)}
                                    staticImage
                                />
                                <div className={cx(s.textCenter, s.profileName)}>
                                    {formatMessage(messages.verifiedBy) + ' ' + siteName}
                                </div>
                            </div>
                        }
                    </div>
                    <div className={s.messageContent}>
                        <div className={s.commentContainer}>
                            <p>
                                {
                                    reviewContent && (reviewContent.trim()).split("\n").map(function (content, index) {
                                        return (
                                            <span key={index}>
                                                {content}
                                                <br />
                                            </span>
                                        )
                                    })
                                }
                            </p>
                            {
                                response && <ResponseItem
                                    data={response}
                                />
                            }
                            <div className={s.hideSm}>
                                <span className={cx(s.pullLeft, s.reviewMuted)}>
                                    {
                                        location && <span><FormattedMessage {...messages.advanceNoticeFrom} /> {location}.</span>
                                    }
                                    {' '}{date} .
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
                <Row className={cx(s.lineSeperation)}>
                    <Col lg={12} sm={12} md={12} xs={12} className={s.padding5per}>
                        <hr className={s.horizontalLineThrough} />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapState = state => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReviewItem)));