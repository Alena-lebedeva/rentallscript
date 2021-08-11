// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux Form
import { Field, reduxForm } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

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
import { url } from '../../config'

//Images
import DefaultIcon from '../../../public/SiteIcons/defaultIcon.png';


// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import ListPlaceTips from '../ListPlaceTips';

import update from './update';

class Page7 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      essentialsAmenities: [],
      safetyAmenities: [],
    }
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  checkboxGroup = ({ label, name, options, input }) => (
    <ul className={s.listContainer}>
      {options.map((option, index) => {
        if (option.isEnable === "1") {
          return (
            <li className={s.listContent} key={index}>
              <span className={s.checkBoxSection}>
                <CustomCheckbox
                  name={`${input.name}[${index}]`}
                  className={'icheckbox_square-green'}
                  value={option.id}
                  checked={input.value.indexOf(option.id) !== -1}
                  onChange={event => {
                    const newValue = [...input.value];
                    if (event === true) {
                      newValue.push(option.id);
                    } else {
                      newValue.splice(newValue.indexOf(option.id), 1);
                    }
                    return input.onChange(newValue);
                  }}
                />
              </span>
              <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                {
                  option.itemDescription ?
                    <img src={url + '/images/amenities/' + option.itemDescription} className={s.imgSection} /> :
                    <img src={DefaultIcon} className={s.imgSection} />
                }
                <label className={cx(s.checkboxLabel, s.noPadding)}>{option.itemName}</label>
              </span>
            </li>
          )
        }
      })
      }
    </ul>
  );

  render() {
    const { handleSubmit, submitting, pristine, previousPage, nextPage } = this.props;
    const { essentialsAmenities, safetyAmenities } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.whatamenities} />
              </h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <Field name="amenities" component={this.checkboxGroup} options={essentialsAmenities} />
                  </FormGroup>

                  <FormGroup className={s.formGroup}>
                    <label className={cx(s.landingLabel, s.landingSaftyTitle)}><FormattedMessage {...messages.safetyamenities} /></label>
                    <Field name="safetyAmenities" component={this.checkboxGroup} options={safetyAmenities} />
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />

                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("map")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("spaces")}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    )
  }
}

Page7 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Page7);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page7)));
