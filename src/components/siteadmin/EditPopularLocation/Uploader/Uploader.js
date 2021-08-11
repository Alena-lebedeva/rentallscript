import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Uploader.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';
import { doRemoveLocation } from '../../../../actions/siteadmin/manageLocationImage';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';
// Asset
import defaultPic from './no-image-available.png';

class Uploader extends React.Component {

  static propTypes = {
    values: PropTypes.any,
    locationUploaderLoading: PropTypes.bool,
    loading: PropTypes.bool,
    doRemoveLocation: PropTypes.any.isRequired,
  };

  static defaultProps = {
    locationUploaderLoading: false,
  };

  render() {
    const { doRemoveLocation, locationUploaderLoading, values } = this.props;
    let loading = true;
    if (values) {
      loading = false;
    }
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={locationUploaderLoading}
            type={"page"}
          >
            <div className={s.picContainer}>

              <div className={s.profilePic}>
                {
                  loading && <div>Loading...</div>
                }
                {
                  !loading && values.image != null && <img
                    src={'/images/popularLocation/medium_' + values.image}
                    height={200}
                    width={200}
                  />
                }
                {
                  !loading && values.image === null && <img
                    src={defaultPic}
                    height={200}
                    width={200}
                  />
                }
              </div>
              {
                !loading && values.image != null && <a href="javascript:void(0);" onClick={() => doRemoveLocation(values.image, values.id)}>
                  <FontAwesome.FaTrash className={s.trashIcon} />
                </a>
              }
            </div>
          </Loader>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.fullWidth, s.button, s.btnPrimaryBorder, s.btnlarge)}>
            <DropZone data={values} />
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  locationUploaderLoading: state.popularLocation.locationUploaderLoading,
});

const mapDispatch = {
  doRemoveLocation
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
)(Uploader);
