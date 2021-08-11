import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Row
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OverlayImageBanner.css';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';



// History
import history from '../../../core/history';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };


  handleClick() {
    history.push('/become-a-host?mode=new');
  }

  render() {
    const { refer, siteName } = this.props;

    return (
      <Grid fluid className={s.overlayImageSection}>
        <Row className={s.overmobile}>
          <div className={s.overlayBg}>
            <div className={s.overlayContent}>
              <h2><FormattedMessage {...messages.readyToEarn} /></h2>
              <Button className={s.brnStarted} onClick={this.handleClick} ><FormattedMessage {...messages.readyToEarnDesc} /></Button>
            </div>
          </div>
        </Row>
      </Grid>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
