import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfile.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import EditProfileForm from '../../components/EditProfileForm';
import EditProfileSideMenu from '../../components/EditProfileSideMenu';

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    return (

      <div className={s.container}>
        <Grid>
          <Row className={cx(s.landingContainer)}>
            <Col xs={12} sm={3} md={3} lg={3} className={cx(s.smBottom, s.smPadding)}>
              <EditProfileSideMenu />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
              <EditProfileForm />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

export default withStyles(s)(EditProfile);
