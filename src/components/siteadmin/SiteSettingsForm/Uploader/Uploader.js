import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Uploader.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';
import { doRemoveLogo } from '../../../../actions/siteadmin/manageLogo';

// Component
import DropZone from './DropZone';
import Avatar from '../../../Avatar';
import Loader from '../../../Loader';
// Asset
import defaultPic from './no-image-available.png';

class Uploader extends React.Component {

  static propTypes = {
    logoUploaderLoading: PropTypes.bool,
    doRemoveLogo: PropTypes.any.isRequired,
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
    logoUploaderLoading: false
  };

  render() {
    const { getLogoData: { loading, getLogo }, doRemoveLogo, logoUploaderLoading } = this.props;
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={logoUploaderLoading}
            type={"page"}
          >
            <div className={s.picContainer}>

              <div className={s.profilePic}>
                {
                  loading && <div>Loading...</div>
                }
                {
                  !loading && getLogo != null && <img
                    src={'/images/logo/' + getLogo.value}
                    height={200}
                    width={200}
                  />
                }
                {
                  !loading && getLogo === null && <img
                    src={defaultPic}
                    height={200}
                    width={200}
                  />
                }
              </div>
              {
                !loading && getLogo != null && <a href="javascript:void(0);" onClick={() => doRemoveLogo(getLogo.value)}>
                  <FontAwesome.FaTrash className={s.trashIcon} />
                </a>
              }
            </div>
          </Loader>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.fullWidth, s.button, s.btnPrimaryBorder, s.btnlarge)}>
            <DropZone data={getLogo} />
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  logoUploaderLoading: state.siteSettings.logoUploaderLoading
});

const mapDispatch = {
  doRemoveLogo
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getLogo{
        getLogo {
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
)(Uploader);
