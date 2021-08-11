import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux Form
import { Field, reduxForm } from 'redux-form';

import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';

// Component
import CountryList from '../../CountryList';

// Helpers
import validate from './validate';

// Locale
import messages from '../../../locale/messages';

class PayoutBillingDetails extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  renderField = ({ input, label, type, meta: { touched, error, dirty } }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.space1, s.displayFlex)}>
        <Col lg="3" md="3" sm="12" xs="12" className={cx(s.responsiveTextAlign, s.responsivePadding)}>
          <label className={s.labelText}>{label}</label>
        </Col>
        <Col lg="9" md="9" sm="12" xs="12" className={s.responsivePadding}>
          <FormGroup className={s.formGroup}>
            <FormControl {...input} componentClass="input" className={cx(s.formControlInput, s.commonBorder, s.inputFormControl)} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </FormGroup>
        </Col>
      </div>
    );
  }

  renderCountryList = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.space1, s.displayFlex)}>
        <Col lg="3" md="3" sm="12" xs="12" className={cx(s.responsiveTextAlign, s.responsivePadding)}>
          <label className={s.labelText}><FormattedMessage {...messages.country} /></label>
        </Col>

        <Col lg="9" md="9" sm="12" xs="12" className={s.responsivePadding}>
          <FormGroup className={s.formGroup}>
            <CountryList input={input} className={cx(className, s.selectFormControl)} isEmptyFirst />
          </FormGroup>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </Col>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={'inputFocusColor'}>
        <form onSubmit={handleSubmit}>
          <Panel
            className={s.panelHeader}
            header={formatMessage(messages.addPayout)}
            footer={
              <Button
                className={cx(s.button, s.btnlarge, s.btnPrimary)}
                type="submit"
              ><FormattedMessage {...messages.next} />
              </Button>
            }
          >
            <div className={s.panelBody}>
              <Field name="country" component={this.renderCountryList} className={cx(s.formControlSelect, s.commonBorder)} />
              <Field name="address1" component={this.renderField} label={formatMessage(messages.address1)} />
              <Field name="address2" component={this.renderField} label={formatMessage(messages.address2)} />
              <Field name="city" component={this.renderField} label={formatMessage(messages.city)} />
              <Field name="state" component={this.renderField} label={formatMessage(messages.state)} />
              <Field name="zipcode" component={this.renderField} label={formatMessage(messages.zipCode)} />
            </div>
          </Panel>
        </form>
      </div>
    );
  }
}

PayoutBillingDetails = reduxForm({
  form: 'PayoutForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(PayoutBillingDetails);

export default injectIntl(withStyles(s)(PayoutBillingDetails));
