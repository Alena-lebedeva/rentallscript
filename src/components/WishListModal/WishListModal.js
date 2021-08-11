// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './WishListModal.css';
import {
  Col,
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeWishListModal } from '../../actions/WishList/modalActions';

// Components
import SocialLogin from '../SocialLogin';
import WishListModalForm from '../WishListModalForm';
import Link from '../Link';
import Loader from '../Loader';

import ListDetails from './ListDetails';

import CreateWishList from './CreateWishList';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// GraphQL
import { graphql, gql, compose } from 'react-apollo';

// Query
import getWishListGroupQuery from './getAllWishListGroup.graphql';
import ListingDataQuery from '../WishListModal/ListDetails/getListingData.graphql';

// Default Image
import defaultPic from './large_no_image.jpeg';

//Images
import bannerImage from './Banner.jpg'

class WishListModal extends Component {
  static propTypes = {
    closeWishListModal: PropTypes.any,
    wishListModal: PropTypes.bool,
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllWishListGroup: PropTypes.any
    }),
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
    this.state = {
      wishListModalStatus: false,
      showImage: ''
    };
  }

  componentDidMount() {
    const { wishListModal } = this.props;
    const { getListingData: { UserListing } } = this.props;
    if (wishListModal === true) {
      this.setState({ wishListModalStatus: true });
      // document.body.classList.add('disable-Scroll');
    }
    let coverPhoto = UserListing && UserListing.coverPhoto;
    let coverImage = UserListing && UserListing.listPhotos && UserListing.listPhotos.find(o => o.id == coverPhoto);
    let path = '/images/upload/x_large_';
    let showImage;
    if (coverImage) {
      showImage = path + coverImage.name;
      this.setState({ showImage: showImage })
    } else if (!coverImage && UserListing && UserListing.listPhotos && UserListing.listPhotos.length > 0) {
      showImage = path + (UserListing.listPhotos && UserListing.listPhotos[0].name);
      this.setState({ showImage: showImage })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { wishListModal } = nextProps;
    const { getListingData: { UserListing } } = nextProps;
    if (wishListModal === true) {
      this.setState({ wishListModalStatus: true });
      // document.body.classList.add('disable-Scroll');
    } else {
      this.setState({ wishListModalStatus: false });
      // document.body.classList.remove('disable-Scroll');
    }
    let coverPhoto = UserListing && UserListing.coverPhoto;
    let coverImage = UserListing && UserListing.listPhotos && UserListing.listPhotos.find(o => o.id == coverPhoto);
    let path = '/images/upload/x_large_';
    let showImage;
    if (coverImage) {
      showImage = path + coverImage.name;
      this.setState({ showImage: showImage })
    } else if (!coverImage && UserListing && UserListing.listPhotos && UserListing.listPhotos.length > 0) {
      showImage = path + (UserListing.listPhotos && UserListing.listPhotos[0].name);
      this.setState({ showImage: showImage })
    }
  }

  render() {
    const { closeWishListModal, data, data: { loading, getAllWishListGroup }, profileId, listId } = this.props;
    const { wishListModalStatus, showImage } = this.state;

    let wishListGroups = [];
    if (getAllWishListGroup && getAllWishListGroup.count > 0) {
      getAllWishListGroup.wishListGroupData.map((option, index) => {
        if (option.wishListIds.indexOf(listId) !== -1) {
          wishListGroups.push(option.id);
        }
      });
    }

    let initialValues = {
      listId,
      wishListGroups
    };

    return (
      <div>
        <Modal show={wishListModalStatus} animation={false} onHide={closeWishListModal} dialogClassName={cx(s.logInModalContainer, 'loginModal', 'wishListCloseBtn', 'wishListCloseNew')} >
          <div className={s.displayTable}>
            <div className={s.displayTableRow}>
              <div
                className={cx(s.displayTableCell, s.contentWidth, s.vtrMiddle, s.image, s.responsiveView)}
                style={{ backgroundImage: `url(${showImage})` }}>
                <div className={cx(s.footerContainer, s.listDetail)}>
                  <a href={'/rooms/' + listId} target="_blank" className={s.linkContainer}>
                    <ListDetails initialValues={initialValues} />
                  </a>
                </div>
              </div>
              <div className={cx(s.displayTableCell, s.contentWidth, s.vtrTop)}>
                <div className={s.sectionBlock}>
                  <Modal.Header closeButton>
                  </Modal.Header>
                  <Modal.Body bsClass={s.logInModalBody}>
                    <div className={cx(s.wishListTitle, s.wishListTitlePadding)}>
                      <span><FormattedMessage {...messages.wishLists} /></span>
                    </div>
                    <div className={s.root}>
                      <div className={s.container}>
                        <CreateWishList initialValues={initialValues} />
                        {
                          loading && <Col xs={12} sm={12} md={12} lg={12}>
                            <Loader type="text" />
                          </Col>
                        }
                        {
                          !loading && <WishListModalForm data={data} initialValues={initialValues} />
                        }
                      </div>
                    </div>
                  </Modal.Body>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  wishListModal: state.modalStatus.wishListModalOpen,
  profileId: state.account.data.profileId,
  listId: state.modalStatus.listId
});

const mapDispatch = {
  closeWishListModal
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getWishListGroupQuery,
    {
      options: (props) => ({
        variables: {
          profileId: props.profileId
        },
        fetchPolicy: 'network-only'
      })
    }
  ),
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

)(WishListModal);
