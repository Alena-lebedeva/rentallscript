// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { updateLocationStatus } from '../../actions/getLocation';
import { updateListingMap } from '../../actions/updateListingMap';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Helpers
import validate from './validate';

// Internal Component
import PlacesSuggest from '../PlacesSuggest';
import ListPlaceTips from '../ListPlaceTips';
import CountryList from '../CountryList';
import Loader from '../Loader';

import update from './update';

class Page5 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    isLocationChosen: PropTypes.bool,
    previousPage: PropTypes.any,
    onSubmit: PropTypes.any,
    updateLocationStatus: PropTypes.any,
    nextPage: PropTypes.any,
    isExistingList: PropTypes.bool,
    updateListingMap: PropTypes.any,
    mapUpdateLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      hideSuggestInput: true,
    };
    this.renderCountryList = this.renderCountryList.bind(this);
  }

  componentWillMount() {
    const { isExistingList, isLocationChosen } = this.props;
    if (!isLocationChosen && !isExistingList) {
      this.setState({ hideSuggestInput: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isExistingList, isLocationChosen } = nextProps;
    if (!isLocationChosen && !isExistingList) {
      this.setState({ hideSuggestInput: false });
    } else {
      this.setState({ hideSuggestInput: true });
    }
  }

  renderPlacesSuggest = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <PlacesSuggest
          {...input}
          label={label}
          className={className}
        />
      </div>
    )
  }


  renderField = ({ input, label, type, meta: { touched, error, dirty } }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <span>{formatMessage(error)}</span>}
        </div>
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }


  renderCountryList({ input, label, meta: { touched, error }, children, className }) {
    const { formatMessage } = this.props.intl;
    return <CountryList input={input} className={className} />
  }


  renderLocationInput = () => {
    const { updateLocationStatus, nextPage, previousPage, loading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div className={s.landingMainContent}>
          <h3 className={s.landingContentTitle}>
            <FormattedMessage {...messages.whereLocated} />
          </h3>
          <FormGroup className={s.formGroup}>
            <Field
              name="location"
              component={this.renderPlacesSuggest}
              label={formatMessage(messages.yourFullAddress)}
              className={cx(s.formControlInput, s.jumboInput)}
            />
          </FormGroup>
        </div>
        <div className={s.nextPosition}>
          <div className={s.nextBackButton}>
            <hr className={s.horizontalLineThrough} />
            <FormGroup className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("bathrooms")}>
                  <FormattedMessage {...messages.back} />
                </Button>
                <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={updateLocationStatus}>
                  <FormattedMessage {...messages.next} />
                </Button>
              </Col>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }

  renderLocationForm = () => {
    const { isExistingList, nextPage, previousPage, onSubmit, invalid, updateListingMap, loading, mapUpdateLoading } = this.props;
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, valid } = this.props;
    let isDisabled = true;
    if (valid) {
      isDisabled = false;
    }
    return (
      <div>
        <div className={s.landingMainContent}>
          <h3 className={s.landingContentTitle}>
            <FormattedMessage {...messages.whereLocated} />
          </h3>

          <FormGroup className={s.formGroup}>
            <ControlLabel className={s.landingLabel}>
              <FormattedMessage {...messages.country} />
            </ControlLabel>
            <Field name="country" component={this.renderCountryList} className={cx(s.formControlSelect, s.jumboSelect, s.formControlSelectLarge)} />
          </FormGroup>

          <FormGroup className={s.formGroup}>
            <ControlLabel className={s.landingLabel}>
              <FormattedMessage {...messages.street} />
            </ControlLabel>
            <Field
              name="street"
              component={this.renderFormControl}
              className={cx(s.formControlInput, s.jumboInput)}
              label={formatMessage(messages.street)}
            />
          </FormGroup>

          <FormGroup className={s.formGroup}>
            <ControlLabel className={s.landingLabel}>
              <FormattedMessage {...messages.buildingName} />
            </ControlLabel>
            <Field
              name="buildingName"
              component={this.renderFormControl}
              className={cx(s.formControlInput, s.jumboInput)}
              label={formatMessage(messages.buildingName)}
            />
          </FormGroup>

          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.city} />
                </ControlLabel>
                <Field
                  name="city"
                  component={this.renderFormControl}
                  className={cx(s.formControlInput, s.jumboInput)}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.state} />
                </ControlLabel>
                <Field
                  name="state"
                  component={this.renderFormControl}
                  className={cx(s.formControlInput, s.jumboInput)}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup className={s.formGroup}>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.zipcode} />
                </ControlLabel>
                <Field
                  name="zipcode"
                  component={this.renderFormControl}
                  className={cx(s.formControlInput, s.jumboInput)}
                />
              </Col>
            </Row>
          </FormGroup>

        </div>
        <div className={s.nextPosition}>
          <div className={s.nextBackButton}>

            <hr className={s.horizontalLineThrough} />

            <FormGroup className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("bathrooms")}>
                  <FormattedMessage {...messages.back} />
                </Button>
                {
                  isExistingList && <Loader
                    type={"button"}
                    label={"Next"}
                    show={mapUpdateLoading}
                    disabled={isDisabled}
                    className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)}
                    handleClick={() => updateListingMap()}
                  />
                }

                {
                  !isExistingList && <Loader
                    type={"button"}
                    label={"Next"}
                    buttonType={"submit"}
                    show={loading}
                    disabled={error || submitting}
                    className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)}
                  />
                }

              </Col>
            </FormGroup>
          </div>
        </div>

      </div>
    );
  }

  render() {

    const { error, handleSubmit, submitting, pristine, previousPage, onSubmit, nextPage } = this.props;
    const { isLocationChosen, isExistingList } = this.props;
    const { formatMessage } = this.props.intl;
    const { hideSuggestInput } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <form onSubmit={handleSubmit}>
              {error && <strong>{formatMessage(error)}</strong>}
              {
                hideSuggestInput && this.renderLocationForm()
              }
              {
                !hideSuggestInput && this.renderLocationInput()
              }
            </form>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    );
  }
}

Page5 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page5);

const mapState = (state) => ({
  isLocationChosen: state.location.isLocationChosen,
  isExistingList: state.location.isExistingList,
  loading: state.loader.location,
  mapUpdateLoading: state.location.mapUpdateLoading
});

const mapDispatch = {
  updateLocationStatus,
  updateListingMap
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page5)));
