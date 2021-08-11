import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BlockUploader.css';
import * as FontAwesome from 'react-icons/lib/fa';
import { formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { doRemoveStaticImage } from '../../../../actions/siteadmin/manageStaticBlock';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';

// Asset
import defaultPic from './no-image-available.png';

class BlockUploader extends React.Component {

  static propTypes = {
    staticImageLoading: PropTypes.bool,
    doRemoveStaticImage: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    staticImageLoading: false
  };

  render() {
    const { getLogoData: { loading, getStaticInfo }, image, doRemoveStaticImage, staticImageLoading } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={staticImageLoading}
            type={"page"}
          >
            <div className={s.picContainer}>

              <div className={s.profilePic}>
                {
                  loading && <div>Loading...</div>
                }
                {
                  !loading && getStaticInfo && getStaticInfo[0].image && <img
                    src={'/images/home/' + getStaticInfo[0].image}
                    height={200}
                    width={200}
                  />
                }
                {
                  !loading && getStaticInfo && !getStaticInfo[0].image && <img
                    src={defaultPic}
                    height={200}
                    width={200}
                  />
                }
              </div>
              {/* {
                !loading && getStaticInfo[0].image && <a href="javascript:void(0);" onClick={() => doRemoveStaticImage(getStaticInfo[0].image, 'block1')}>
                  <FontAwesome.FaTrash className={s.trashIcon} />
                </a>
              } */}
            </div>
          </Loader>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.fullWidth, s.button, s.btnPrimaryBorder, s.btnlarge)}>
            <DropZone data={getStaticInfo} />
          </Col>
        </Col>
      </Row>
    );
  }
}
const selector = formValueSelector('StaticBlockForm');

const mapState = (state) => ({
  staticImageLoading: state.homeBannerImages.staticImageLoading,
  // image: selector(state, 'blockImage1')
});

const mapDispatch = {
  doRemoveStaticImage
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
  query ($name: String) {
    getStaticInfo(name: $name) {
      name
      image
      content
      title
    }
  }
    `, {
      name: 'getLogoData',
      options: {
        ssr: false,
        variables: {
          name: 'block1'
        },
      }
    }),
)(BlockUploader);
