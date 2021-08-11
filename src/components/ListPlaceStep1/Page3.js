// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector, FieldArray, change } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Internal Component
import IncrementButton from '../IncrementButton';

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

// Component
import ListPlaceTips from '../ListPlaceTips';

import update from './update';

// Internal Component
import IncrementBtn from './IncrementBtn';

class Page3 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    beds: PropTypes.number,
    nextPage: PropTypes.any,
    bedTypes: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      bedType: [],
      beds: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      bedrooms: [],
      personCapacity: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        bedType: listingFields.bedType,
        beds: listingFields.beds[0],
        bedrooms: listingFields.bedrooms,
        personCapacity: listingFields.personCapacity[0]
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        bedType: listingFields.bedType,
        beds: listingFields.beds[0],
        bedrooms: listingFields.bedrooms,
        personCapacity: listingFields.personCapacity[0]
      });
    }
  }


  renderIncrementButton = (field) => (
    <IncrementButton
      {...field}
    />
  );

  renderIncrementBtn = (input, dispatch) => (
    <IncrementBtn
      {...input}
      onChange={this.handleClick}
    />
  );

  renderSelectField = ({ input, label, meta: { touched, error }, children }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <select
          {...input}
        >
          {children}
        </select>
        {touched && error && <span>{formatMessage(error)}</span>}
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

  renderBedTypes = ({ fields, meta: { error, submitFailed } }) => {
    const { formatMessage } = this.props.intl;
    const { bedType } = this.state;
    return (
      <div className={s.spaceTop2}>
        {
          fields.map((beds, index) => (

            <div key={index}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <FormGroup className={s.formGroup}>
                    <Field
                      name={`${beds}.bedType`}
                      type="text"
                      component={this.renderFormControlSelect}
                      className={cx(s.formControlSelect, s.jumboSelect)}
                    >
                      {
                        bedType.map((value, key) => {
                          return (
                            value.isEnable == 1 && <option value={value.id} key={key}>{value.itemName}</option>
                          )
                        })
                      }
                    </Field>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          ))
        }
      </div>
    )
  }

  async handleClick(e) {
    const { beds, bedTypes, change } = this.props;
    const { bedType } = this.state;

    let bedTypesValue = Object.keys(bedTypes).map(function (key) {
      return bedTypes[key];
    });

    let updatedBedTypesArray = (bedTypesValue && bedTypesValue.length > 0) ? bedTypesValue.slice(0) : [];
    let updatedBedCount = beds + 1;
    let obj = {};

    if (Number(beds) < Number(e)) {
      obj = {
        bedCount: updatedBedCount,
        bedType: bedType.length > 0 ? bedType[0].id : null,
      };
      try {
        updatedBedTypesArray.push(obj);
      } catch (e) {

      }
    } else if ((Number(beds) >= Number(e)) || (Number(e) > 2)) {
      updatedBedTypesArray.splice(bedTypesValue.length - 1, 1);
    }

    await change('bedTypes', []);
    await change('bedTypes', updatedBedTypesArray);
  }

  render() {
    const { handleSubmit, submitting, pristine, previousPage, nextPage, bedTypes } = this.props;
    const { bedrooms, bedType, beds, personCapacity } = this.state;

    return (
      <Grid fluid>
        <Row className={cx(s.landingContainer, 'arrowPosition')}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.howManyGuests} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>

                  <FormGroup className={s.formGroup}>
                    <Field
                      name="personCapacity"
                      type="text"
                      component={this.renderIncrementButton}
                      labelSingluar={personCapacity.itemName}
                      labelPlural={personCapacity.otherItemName}
                      maxValue={personCapacity.endValue}
                      minValue={personCapacity.startValue}
                      incrementBy={1}
                    />
                  </FormGroup>

                  <FormGroup className={s.formGroup}>
                    <ControlLabel className={s.landingLabel}>
                      <FormattedMessage {...messages.howManyBedrooms} />
                    </ControlLabel>
                    <Field name="bedrooms" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.jumboSelect)} >
                      {
                        bedrooms.map((value, key) => {
                          let rows = [];
                          for (let i = value.startValue; i <= value.endValue; i++) {
                            rows.push(<option value={i}>{i} {i > 1 ? value.otherItemName : value.itemName}</option>);
                          }
                          return rows;
                        })
                      }
                    </Field>
                  </FormGroup>

                  <FormGroup className={s.formGroup}>
                    <ControlLabel className={s.landingLabel}>
                      <FormattedMessage {...messages.howManyBeds} />
                    </ControlLabel>
                    <Field
                      name="beds"
                      type="text"
                      component={this.renderIncrementBtn}
                      labelSingluar={beds.itemName}
                      labelPlural={beds.otherItemName}
                      minValue={beds.startValue}
                      incrementBy={1}
                    />
                  </FormGroup>

                  <FieldArray name="bedTypes" component={this.renderBedTypes} className={s.spaceTop2} />

                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>

                    <hr className={s.horizontalLineThrough} />

                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("room")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("bathrooms")}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div></div>

              </form>
            </div>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    )
  }
}


Page3 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Page3);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingFields: state.listingFields.data,
  beds: selector(state, 'beds'),
  bedCount: selector(state, 'beds'),
  bedTypes: selector(state, 'bedTypes'),
});

const mapDispatch = {
  change,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page3)));
