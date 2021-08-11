import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Image.css';
import { formValueSelector } from 'redux-form';

import { connect } from 'react-redux';
import DropZone from './DropZone';
import Loader from '../../../../Loader/Loader';
import defaultPic from './no-image-available.png';

class Image extends React.Component {

  static defaultProps = {
    loader: false
  };

  render() {
    const { loader, image } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={loader}
            type={"page"}
          >
            <div className={s.picContainer}>

              <div className={s.profilePic}>
                
                {
                    image && <img
                    src={'/images/home/' + image}
                    height={200}
                    width={200}
                  />
                }
                {
                    !image && <img
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
            <DropZone />
          </Col>
        </Col>
      </Row>
    );
  }
}
const selector = formValueSelector('WhyHostForm');

const mapState = (state) => ({
  loader: state.image.loader,
  image: selector(state, 'quoteSectionImage1')
});

const mapDispatch = {
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch)
)(Image);