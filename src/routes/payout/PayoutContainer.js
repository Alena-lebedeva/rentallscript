import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PayoutContainer.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import AccountSettingsSideMenu from '../../components/AccountSettingsSideMenu';
import Payout from '../../components/Payout';

class PayoutContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title, currentAccountId } = this.props;
    return (
      <div className={s.container}>
        <Grid>
          <Row className={cx(s.spaceTop4, s.landingContainer)}>
            <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
              <AccountSettingsSideMenu />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
              <Payout currentAccountId={currentAccountId} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

export default withStyles(s)(PayoutContainer);
