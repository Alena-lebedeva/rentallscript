// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

import { graphql, compose } from 'react-apollo';

import { injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

import ListingDataQuery from './getListingData.graphql';

import Loader from '../../Loader';

import StarRating from '../../StarRating';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListDetails.css';
import {
    Col
} from 'react-bootstrap';

import Avatar from '../../Avatar';

class ListDetails extends Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        listId: PropTypes.number,
        getListingData: PropTypes.shape({
            loading: PropTypes.bool,
            UserListing: PropTypes.object
        }),
    };

    static defaultProps = {
        data: {
            loading: true
        },
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, id, title } = this.props;
        const { formatMessage } = this.props.intl;
        const { getListingData: { loading, UserListing }, listId } = this.props;

        let isProfile = UserListing && UserListing.user && UserListing.user.profile && UserListing.user.profile.picture;
        let isProfileId = UserListing && UserListing.user && UserListing.user.profile && UserListing.user.profile.profileId;


        return (
            <div>
                {
                    loading && <Col xs={12} sm={12} md={12} lg={12}>
                        <Loader type="text" />
                    </Col>
                }
                {
                    !loading && UserListing && <div className={s.responsiveView}>
                        <div className={cx(s.imgContainer)}>
                            {/* <ListCoverPhoto
                                className={cx(s.imageContent)}
                                coverPhoto={UserListing.coverPhoto}
                                listPhotos={UserListing.listPhotos}
                                photoType={"x_small"}
                                bgImage
                            /> */}
                            <Avatar
                                source={isProfile}
                                height={70}
                                width={70}
                                // title={displayName}
                                className={s.imageContent}
                                withLink
                                linkClassName={s.profileAvatarLink}
                                profileId={isProfileId}
                            />
                        </div>
                        <div className={s.textContainer}>
                            <div className={cx(s.textBottom, s.listTitleText)}>
                                <div className={s.textOverflow}>{UserListing.title}</div>
                            </div>
                            <div className={cx(s.textBottom, s.subTexContainer)}>
                                <div className={s.textOverflow}>{UserListing.street}, {UserListing.city}</div>
                            </div>
                            <span className={cx(s.reviewText, s.pullRight)}>
                                &nbsp; {UserListing.reviewsCount} {UserListing.reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
                            </span>
                            <span className={cx(s.reviewStar, s.pullRight)}>
                                <StarRating value={UserListing.reviewsStarRating} name={'review'} />
                            </span>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

const mapState = (state) => ({
    listId: state.modalStatus.listId
});

const mapDispatch = {};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(ListingDataQuery,
        {
            name: 'getListingData',
            options: (props) => ({
                variables: {
                    listId: props.listId,
                },
                fetchPolicy: 'network-only'
            })
        }
    ),
)
    (ListDetails);
