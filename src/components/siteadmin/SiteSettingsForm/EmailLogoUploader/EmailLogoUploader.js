import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmailLogoUploader.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';
import { doRemoveEmailLogo } from '../../../../actions/siteadmin/manageLogo';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';
// Asset
import defaultPic from './no-image-available.png';

class EmailLogoUploader extends React.Component {

  static propTypes = {
    emailLogoUploaderLoading: PropTypes.bool,
    doRemoveEmailLogo: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getEmailLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    getLogoData: {
      loading: true
    },
    emailLogoUploaderLoading: false
  };

  render() {
    const { getLogoData: { loading, getEmailLogo }, doRemoveEmailLogo, emailLogoUploaderLoading } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={emailLogoUploaderLoading}
            type={"page"}
          >
            <div className={s.picContainer}>

              <div className={s.profilePic}>
                {
                  loading && <div>Loading...</div>
                }
                {
                  !loading && getEmailLogo && getEmailLogo.value && <img
                    src={'/images/logo/' + getEmailLogo.value + '?' + new Date()}
                    height={200}
                    width={200}
                  />
                }
                {
                  !loading && getEmailLogo && !getEmailLogo.value && <img
                    src={defaultPic}
                    height={200}
                    width={200}
                  />
                }
                {
                  !loading && getEmailLogo === null && <img
                    src={defaultPic}
                    height={200}
                    width={200}
                  />
                }
              </div>
              {
                !loading && getEmailLogo && getEmailLogo.value && <a href="javascript:void(0);" onClick={() => doRemoveEmailLogo(getEmailLogo.value)}>
                  <FontAwesome.FaTrash className={s.trashIcon} />
                </a>
              }
            </div>
          </Loader>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.fullWidth, s.button, s.btnPrimaryBorder, s.btnlarge)}>
            <DropZone data={getEmailLogo} />
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  emailLogoUploaderLoading: state.siteSettings.emailLogoUploaderLoading
});

const mapDispatch = {
  doRemoveEmailLogo
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getEmailLogo{
        getEmailLogo {
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
)(EmailLogoUploader);
