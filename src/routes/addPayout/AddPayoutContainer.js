import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddPayoutContainer.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import AccountSettingsSideMenu from '../../components/AccountSettingsSideMenu';
import PayoutForm from '../../components/Payout/PayoutForm';

class AddPayoutContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialData: PropTypes.object.isRequired
  };

  render() {
    const { title, initialData } = this.props;
    return (
      <div className={s.container}>
        <Grid>
          <Row className={cx(s.landingContainer, s.spaceTop4)}>
            <Col xs={12} sm={3} md={3} lg={3}>
              <AccountSettingsSideMenu />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9}>
              <PayoutForm initialValues={initialData} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

export default withStyles(s)(AddPayoutContainer);
