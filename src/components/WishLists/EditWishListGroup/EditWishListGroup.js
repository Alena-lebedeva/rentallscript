// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// GraphQL
import { graphql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';

// Locale
import messages from '../../../locale/messages';

import { openAddWishListGroupModal } from '../../../actions/WishList/modalActions';
import { deleteWishListGroup } from '../../../actions/WishList/deleteWishListGroup';

// GraphQL
import getWishListGroupQuery from './getWishListGroup.graphql';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
    Grid,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import s from './EditWishListGroup.css';

import Confirm from 'react-confirm-bootstrap';

// Components
import Loader from '../../../components/Loader';
import Link from '../../Link';
import WishListGroupModal from '../WishListGroupModal';
import ListingItem from '../ListingItem';

class EditWishListComponent extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getWishListGroup: PropTypes.any
        }),
    };

    static defaultProps = {
        data: {
            loading: true
        },
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        history.push('/siteadmin/popularlocation/add')
    }

    render() {
        const { profileId, wishListId } = this.props;
        const { data: { loading, getWishListGroup } } = this.props;
        const { formatMessage } = this.props.intl;
        const { openAddWishListGroupModal, deleteWishListGroup } = this.props;

        let initialValues = {};

        if (getWishListGroup && getWishListGroup.id) {
            initialValues = {
                id: getWishListGroup.id,
                name: getWishListGroup.name,
                isPublic: getWishListGroup.isPublic,
                userId: getWishListGroup.userId
            };
        }

        return (
            <div>
                <WishListGroupModal actionType={'edit'} />
                <Grid fluid>
                    {
                        loading && <Col xs={12} sm={12} md={12} lg={12}>
                            <Loader type="text" />
                        </Col>
                    }
                    {
                        !loading && getWishListGroup && <Col xs={12} sm={12} md={12} lg={12} className={cx(s.landingContent, s.noPadding, s.marginTop)}>
                            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.space2)}>
                                <Col xs={12} sm={4} md={6} lg={6} className={s.space2}>
                                    <div className={s.innerPadding}>
                                        <Link to={"/wishlists"} className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge, s.btnlarge, s.resposiveBtn)}>
                                            {formatMessage(messages.goToAllLists)}
                                        </Link>
                                    </div>
                                </Col>
                                <Col xs={12} sm={8} md={6} lg={6} className={s.space2}>
                                    <div className={s.innerPadding}>
                                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight, s.noMargin, s.resposiveBtn)}
                                            onClick={() => openAddWishListGroupModal(initialValues, 'EditWishListGroupForm')}>
                                            <FormattedMessage {...messages.editWishList} />
                                        </Button>
                                    </div>
                                    <div>
                                        <Confirm
                                            onConfirm={() => deleteWishListGroup(getWishListGroup.id)}
                                            // onConfirm={deleteWishListGroup(getWishListGroup.id)}
                                            body={formatMessage(messages.areYouSureDeleteWishList)}
                                            confirmText={formatMessage(messages.confirmDelete)}
                                            title={formatMessage(messages.wishList)}
                                        >
                                            <a href="javascript:void(0)"
                                                className={cx(s.modalCaptionLinkLarge, s.pullRight, s.noMargin, s.modalCaptionLink, s.btnlarge, s.resposiveBtn, s.responsiveDeleteBtn)}>
                                                <FormattedMessage {...messages.deleteWishList} />
                                            </a>
                                        </Confirm>
                                    </div>
                                </Col>
                            </Col>
                            <Col xs={12} sm={8} md={8} lg={8}>
                                <h2 className={cx(s.landingTitle, s.innerPadding)}>
                                    {
                                        getWishListGroup.name
                                    }
                                </h2>
                            </Col>
                            {
                                !loading && getWishListGroup && <Col xs={12} sm={12} md={12} lg={12}>
                                    {
                                        getWishListGroup.wishListCount > 0 && getWishListGroup.wishLists && getWishListGroup.wishLists.length > 0 && <div className={cx(s.landingContentTitle, s.innerPadding)}>
                                            <FormattedMessage {...messages.yourHomes} />
                                            <label className={cx(s.pullRight)}>
                                                <small>{getWishListGroup.wishListCount} {getWishListGroup.wishListCount > 1 ? formatMessage(messages.homes) : formatMessage(messages.home)}</small>
                                            </label>
                                        </div>
                                    }
                                    {
                                        getWishListGroup.wishLists && getWishListGroup.wishLists.length > 0 && getWishListGroup.wishListCount > 0 && <div>
                                            {
                                                getWishListGroup.wishLists.map((item, index) => {
                                                    if (item.listData != null) {
                                                        return (
                                                            <div key={index} className={s.listingSection}>
                                                                <ListingItem
                                                                    id={item.listData.id}
                                                                    basePrice={item.listData.listingData.basePrice}
                                                                    currency={item.listData.listingData.currency}
                                                                    title={item.listData.title}
                                                                    beds={item.listData.beds}
                                                                    personCapacity={item.listData.personCapacity}
                                                                    roomType={item.listData.settingsData[0].listsettings.itemName}
                                                                    coverPhoto={item.listData.coverPhoto}
                                                                    listPhotos={item.listData.listPhotos}
                                                                    bookingType={item.listData.bookingType}
                                                                    reviewsCount={item.listData.reviewsCount}
                                                                    reviewsStarRating={item.listData.reviewsStarRating}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    }
                                    {
                                        getWishListGroup && getWishListGroup.wishListCount == 0 && <Row>
                                            <Col lg={12} md={12} sm={12} xs={12}>
                                                <h3 className={cx(s.innerPadding)}>{formatMessage(messages.noWishlistsHomes)}</h3>
                                            </Col>
                                        </Row>
                                    }
                                </Col>
                            }
                        </Col>
                    }
                </Grid>
            </div>
        )
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    openAddWishListGroupModal,
    deleteWishListGroup
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(getWishListGroupQuery,
        {
            options: (props) => ({
                variables: {
                    profileId: props.profileId,
                    id: props.wishListId
                },
                fetchPolicy: 'network-only',
            })
        }
    )
)(EditWishListComponent);
