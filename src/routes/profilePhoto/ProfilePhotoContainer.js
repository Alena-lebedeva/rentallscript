import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfilePhotoContainer.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import ProfilePhoto from '../../components/ProfilePhoto';
import EditProfileSideMenu from '../../components/EditProfileSideMenu';

class ProfilePhotoContainer extends React.Component {

  static propTypes = {};

  render() {
    return (

      <div className={s.container}>
        <Grid>
          <Row className={cx(s.landingContainer)}>
            <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
              <EditProfileSideMenu />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
              <ProfilePhoto />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

export default withStyles(s)(ProfilePhotoContainer);
