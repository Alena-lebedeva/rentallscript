import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeUploader.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';
import { doRemoveHomeLogo } from '../../../../actions/siteadmin/manageLogo';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';
// Asset
import defaultPic from './no-image-available.png';

class HomeUploader extends React.Component {

  static propTypes = {
    homeLogoUploaderLoading: PropTypes.bool,
    doRemoveHomeLogo: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getHomeLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    homeLogoUploaderLoading: false
  };

  render() {
    const { getLogoData: { loading, getHomeLogo }, doRemoveHomeLogo, homeLogoUploaderLoading } = this.props;
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={homeLogoUploaderLoading}
            type={"page"}
          >
            <div className={s.picContainer}>

              <div className={s.profilePic}>
                {
                  loading && <div>Loading...</div>
                }
                {
                  !loading && getHomeLogo && getHomeLogo.value && <img
                    src={'/images/logo/' + getHomeLogo.value}
                    height={200}
                    width={200}
                  />
                }
                {
                  !loading && getHomeLogo && !getHomeLogo.value && <img
                    src={defaultPic}
                    height={200}
                    width={200}
                  />
                }
                {
                  !loading && getHomeLogo === null && <img
                    src={defaultPic}
                    height={200}
                    width={200}
                  />
                }
              </div>
              {
                !loading && getHomeLogo && getHomeLogo.value && <a href="javascript:void(0);" onClick={() => doRemoveHomeLogo(getHomeLogo.value)}>
                  <FontAwesome.FaTrash className={s.trashIcon} />
                </a>
              }
            </div>
          </Loader>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.fullWidth, s.button, s.btnPrimaryBorder, s.btnlarge)}>
            <DropZone data={getHomeLogo} />
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  homeLogoUploaderLoading: state.siteSettings.homeLogoUploaderLoading
});

const mapDispatch = {
  doRemoveHomeLogo
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getHomeLogo{
        getHomeLogo {
          id
          title
          name
          value
          type
        }
      }
    `, {
      name: 'getLogoData',
      options: {
        ssr: false
      }
    }),
)(HomeUploader);
