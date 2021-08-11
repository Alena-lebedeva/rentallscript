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

// Redux
import { connect } from 'react-redux';

// Redux Form
import { formValueSelector } from 'redux-form';
import { doRemoveLocation } from '../../../../actions/siteadmin/manageLocationImage';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';
// Asset
import defaultPic from './no-image-available.png';

class Uploader extends React.Component {

  static propTypes = {
    image: PropTypes.any,
    locationUploaderLoading: PropTypes.bool,
    doRemoveLocation: PropTypes.any.isRequired,
  };

  static defaultProps = {
    locationUploaderLoading: false,
  };

  render() {
    const { loading, locationUploaderLoading, image } = this.props;
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
                  !loading && image != null && <img
                    src={'/images/popularLocation/' + image}
                    height={200}
                    width={200}
                  />
                }
                {
                  !loading && image === undefined && <img
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
            <DropZone data={image} />
          </Col>
        </Col>
      </Row>
    );
  }
}

const selector = formValueSelector('AddPopularLocation');

const mapState = (state) => ({
  locationUploaderLoading: state.popularLocation.locationUploaderLoading,
  image: selector(state, 'image')
});

const mapDispatch = {
  doRemoveLocation
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
)(Uploader);
