import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Uploader.css';
import { formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { doRemoveStaticImageBlock } from '../../../../actions/siteadmin/manageStaticBlock';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';

// Asset
import defaultPic from './no-image-available.png';

class Uploader extends React.Component {

  static propTypes = {
    staticBlockImageLoading: PropTypes.bool,
    doRemoveStaticImageBlock: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getStaticInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    staticBlockImageLoading: false
  };

  render() {
    const { getLogoData: { loading, getStaticInfo }, image, doRemoveStaticImageBlock, staticBlockImageLoading } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={staticBlockImageLoading}
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
  staticBlockImageLoading: state.homeBannerImages.staticBlockImageLoading,
  image: selector(state, 'blockImage1')
});

const mapDispatch = {
  doRemoveStaticImageBlock
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
          name: 'block2'
        },
      }
    }),
)(Uploader);
