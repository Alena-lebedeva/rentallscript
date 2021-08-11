import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePasswordContainer.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import { connect } from 'react-redux';

// Components
import ChangePasswordForm from '../../components/ChangePasswordForm';
import AccountSettingsSideMenu from '../../components/AccountSettingsSideMenu';

class ChangePasswordContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    registeredType: PropTypes.string
  };

  render() {
    const { title, registeredType } = this.props;
    const initialValues = { registeredType };

    return (
      <div className={s.container}>
        <Grid>
          <Row className={cx(s.spaceTop4, s.landingContainer)}>
            <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
              <AccountSettingsSideMenu />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
              <ChangePasswordForm initialValues={initialValues} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

const mapState = (state) => ({
  registeredType: state.account.data.userData.type,
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(ChangePasswordContainer));
