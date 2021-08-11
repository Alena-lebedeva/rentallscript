// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';

// Helpers
import validateStep3 from './validateStep3';

class LocalLaws extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    minNightData: PropTypes.number,
    maxNightData: PropTypes.number,
    siteName: PropTypes.string.isRequired
  };

  static defaultProps = {
    minNightData: 0,
    maxNightData: 0
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, formErrors, minNightData, maxNightData } = this.props;
    const { siteName } = this.props;
    let isDisabled = false;
    if (formErrors != undefined && formErrors.hasOwnProperty('syncErrors')) {
      isDisabled = true;
    }

    if (maxNightData > 0) {
      if (minNightData > maxNightData) {
        isDisabled = true;
      }
    }

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>

            <h3 className={cx(s.landingContentTitle, s.space5)}><FormattedMessage {...messages.localLaws} /></h3>
            <form onSubmit={handleSubmit}>
              <div className={s.landingMainContent}>
                <p className={cx(s.textHigh, s.space3)}>
                  <span>
                    <FormattedMessage {...messages.localLawsOne} />
                  </span>
                </p>
                <div className={cx(s.textLow, s.space5)}>
                  <p>
                    <span>
                      <FormattedMessage {...messages.localLawsTwo} />
                    </span>
                  </p>
                  <p>
                    <span>
                      <FormattedMessage {...messages.localLawsThree} />
                    </span>
                  </p>
                  <p>
                    <span>
                      <FormattedMessage {...messages.localLawsFive} />{' '}{siteName}.{' '}<FormattedMessage {...messages.localLawsSix} />
                    </span>
                  </p>
                  <p>
                    <span>
                    <FormattedMessage {...messages.localLawsSeven} />                      
                </span>
                  </p>
                </div>
              </div>
              <div className={s.nextPosition}>
                <div className={s.nextBackButton}>
                  <hr className={s.horizontalLineThrough} />

                  <FormGroup className={s.formGroup}>
                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                      <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("booking-scenarios")}>
                        <FormattedMessage {...messages.back} />
                      </Button>
                      <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} type="submit" disabled={isDisabled}>
                        <FormattedMessage {...messages.next} />
                      </Button>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </form>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    );
  }
}

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

LocalLaws = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3
})(LocalLaws);

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  listingFields: state.listingFields.data,
  formErrors: state.form.ListPlaceStep3,
  minNightData: selector(state, 'minNight'),
  maxNightData: selector(state, 'maxNight')
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(LocalLaws)));
