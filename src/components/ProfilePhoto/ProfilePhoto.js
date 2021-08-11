import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { graphql, gql, compose } from 'react-apollo';

import {
  Row,
  Col,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfilePhoto.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';
import { doRemoveProfilePicture } from '../../actions/manageUserProfilePicture';

// Component
import DropZone from './DropZone';
import Avatar from '../Avatar';
import Loader from '../Loader';

// Locale
import messages from '../../locale/messages';

class ProfilePhotoUploadForm extends React.Component {

  static propTypes = {
    profilePhotoLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
    doRemoveProfilePicture: PropTypes.any.isRequired,
    profilePictureData: PropTypes.shape({
      loading: PropTypes.bool,
      userAccount: PropTypes.shape({
        picture: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    profilePhotoLoading: false
  };

  render() {

    const title = (
      <h3><FormattedMessage {...messages.profilePhoto} /></h3>
    );
    const { profilePictureData: { loading, userAccount }, doRemoveProfilePicture } = this.props;
    const { profilePhotoLoading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Panel className={s.panelHeader} header={title}>
        <Row>
          <Col xs={12} sm={6} md={4} lg={4} className={s.textAlignCenter}>
            <Loader
              show={profilePhotoLoading}
              type={"page"}
            >
              <div className={s.picContainer}>

                <div className={cx(s.profilePic, s.picRound)}>
                  {
                    loading ? 'Loading...' : <Avatar
                      isUser
                      height={200}
                      width={200}
                      className={s.profileAvatar}
                    />
                  }
                </div>
                {
                  !loading && userAccount.picture != null && <a href="javascript:void(0);" onClick={() => doRemoveProfilePicture(userAccount.picture)}>
                    <FontAwesome.FaTrash className={s.trashIcon} />
                  </a>
                }
              </div>
            </Loader>
          </Col>

          <Col xs={12} sm={6} md={8} lg={8}>
            <p className={cx('hidden-md hidden-lg hidden-sm')}>&nbsp;</p>
            <p className={s.textMuted}>
              <FormattedMessage {...messages.profilePhotoInfo} />
            </p>
            <div className={s.centerFlex}>
              <Col xs={12} sm={4} md={4} lg={4} className={cx(s.spaceTop2, s.fullWidth, s.button, s.btnPrimaryBorder, s.paddingNo)}>
                <DropZone data={userAccount}
                  defaultMessage={formatMessage(messages.dropzoneUpload)}
                />
              </Col>
            </div>
          </Col>
        </Row>
      </Panel>
    );
  }
}

const mapState = (state) => ({
  profilePhotoLoading: state.account.profilePhotoLoading
});

const mapDispatch = {
  doRemoveProfilePicture
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
      query {
          userAccount {
              picture
          }
      }
    `, {
      name: 'profilePictureData',
      options: {
        ssr: false
      }
    }),
)(ProfilePhotoUploadForm);
