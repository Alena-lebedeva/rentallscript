// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import Loader from '../Loader';

// Locale
import messages from '../../locale/messages';

// Helpers
import validate from './validate';

// Internal Component
import PlaceMap from '../PlaceMap';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

import update from './update';

class Page6 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    locationMap: PropTypes.object,
    isMapTouched: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
  };

  renderPlaceMap = ({ input, label, meta: { touched, error }, lat, lng, isMapTouched, mapWarning, mapSuccess }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <PlaceMap
          {...input}
          lat={lat}
          lng={lng}
          isMapTouched={isMapTouched}
          mapWarning={mapWarning}
          mapSuccess={mapSuccess}
        />
      </div>
    )
  }

  render() {

    const { error, handleSubmit, submitting, pristine, previousPage, nextPage } = this.props;
    const { locationMap, isMapTouched, lat, lng } = this.props;
    const { formatMessage } = this.props.intl;
    let isDisabled = true;
    if (isMapTouched === true || locationMap != undefined) {
      isDisabled = false;
    }
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.whereLocated} />
              </h3>
              <form onSubmit={handleSubmit}>
                {error && <strong>{formatMessage(error)}</strong>}
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    {
                      !lat && !lng && <Loader type={"text"} />
                    }

                    {
                      lat && lng &&
                      <Field
                        name="locationMap"
                        component={this.renderPlaceMap}
                        lat={lat}
                        lng={lng}
                        isMapTouched={isMapTouched}
                        mapWarning={formatMessage(messages.mapWarning)}
                        mapSuccess={formatMessage(messages.mapSuccess)}
                      />
                    }
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButtonMap}>
                    <hr className={s.horizontalLineThrough} />

                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("location")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("amenities")} disabled={isDisabled}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Page6 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page6);


// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name
Page6 = connect(
  state => {
    // can select values individually
    const locationMap = selector(state, 'locationMap');
    const isMapTouched = selector(state, 'isMapTouched');
    const lat = selector(state, 'lat');
    const lng = selector(state, 'lng');
    return {
      locationMap,
      isMapTouched,
      lat,
      lng,
    }
  }
)(Page6);

export default injectIntl(withStyles(s)(Page6));
