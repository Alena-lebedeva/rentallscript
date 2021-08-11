// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

//Redux Form
import { Field, reduxForm } from 'redux-form';

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

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Helpers
import validate from './validate';

// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import ListPlaceTips from '../ListPlaceTips';

import update from './update';

class Page8 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    formErrors: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      isDisabled: false
    }
  }

  componentDidMount() {
    const { formErrors, listingFields } = this.props;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if (listingFields != undefined) {
      this.setState({
        spaces: listingFields.spaces,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { formErrors, listingFields } = nextProps;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if (listingFields != undefined) {
      this.setState({
        spaces: listingFields.spaces,
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
                  value={option.id}
                  className={'icheckbox_square-green'}
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
                <label className={cx(s.checkboxLabel, s.noPadding)}>{option.itemName}</label>
              </span>
            </li>
          )
        }
      }
      )
      }
    </ul>
  );

  render() {
    const { handleSubmit, submitting, pristine, previousPage, nextPage, onSubmit } = this.props;
    const { spaces, isDisabled } = this.state;
    const { formErrors } = this.props;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.whatSpace} />
              </h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <Field name="spaces" component={this.checkboxGroup} options={spaces} />
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />

                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("amenities")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} disabled={isDisabled} type="submit">
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
    );
  }
}

Page8 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page8);

const mapState = (state) => ({
  userData: state.account.data,
  formErrors: state.form.ListPlaceStep1,
  listingFields: state.listingFields.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page8)));
