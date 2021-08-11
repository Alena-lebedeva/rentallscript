// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AddPhoneNumberForm.css';

import {
  FormGroup,
  FormControl,
  InputGroup
} from 'react-bootstrap';

import { graphql, gql, compose } from 'react-apollo';

// Internal Components
import CountryList from '../../CountryList';
import Loader from '../../Loader';

// Redux Actions
import { sendVerificationSms } from '../../../actions/SmsVerification/sendVerificationSms';
import { openSmsVerificationModal } from '../../../actions/SmsVerification/modalActions';

class AddPhoneNumberForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      countryCode: 'IN',
      country: '+91',
      phoneNumber: '',
      submitting: false,
      error: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { formatMessage } = this.props.intl;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm() {
    const { sendVerificationSms } = this.props;
    const { formatMessage } = this.props.intl;
    const { country, phoneNumber } = this.state;
    let error = null, submitting = false;
    if (!phoneNumber) {
      error = {
        phoneNumber: formatMessage(messages.required)
      };
    } else if (isNaN(phoneNumber)) {
      error = {
        phoneNumber: formatMessage(messages.required)
      };
    }

    submitting = (error === null) ? true : false;

    this.setState({
      submitting,
      error
    });

    if (error === null && submitting) {
      const { status, errorMessage } = await sendVerificationSms(country, phoneNumber);

      if (status != '200') {
        if (errorMessage) {
          error = {
            phoneNumber: errorMessage
          };
        } else {
          error = {
            phoneNumber: 'Sorry, something went wrong. Please try again'
          };
        }
      }
    }
    if (this.refs.addPhoneNumberForm) {
      this.setState({ submitting: false, error });
    }
  }

  handleCountryChange(e, selectedData) {
    this.setState({
      country: selectedData.dialCode,
      countryCode: selectedData.countryCode
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { country, phoneNumber, submitting, error, countryCode } = this.state;

    return (
      <div className={s.formContainer} ref="addPhoneNumberForm">
        <FormGroup className={s.formGroup}>
          <label className={s.labelText} >
            <FormattedMessage {...messages.chooseACountry} />
          </label>
          <CountryList
            input={
              {
                name: 'countryCode',
                onChange: this.handleChange,
                value: countryCode
              }
            }
            className={cx(s.formControlSelect)}
            dialCode={false}
            getSelected={this.handleCountryChange}
          />
        </FormGroup>

        <FormGroup className={s.formGroup}>
          <label className={s.labelText} >
            <FormattedMessage {...messages.addAPhoneNumber} />
          </label>
          <InputGroup>
            <InputGroup.Addon className={s.inputGroupAddon}>{country}</InputGroup.Addon>
            <FormControl
              name={'phoneNumber'}
              value={phoneNumber}
              placeholder={''}
              type={'text'}
              className={cx(s.formControlInput)}
              onChange={this.handleChange} />
          </InputGroup>
        </FormGroup>

        {error && error.phoneNumber && <span className={s.errorMessage}>{error.phoneNumber}</span>}

        <FormGroup className={cx(s.formGroup, 'text-right')}>
          <Loader
            type={"button"}
            buttonType={"button"}
            className={cx(s.button, s.btnPrimary, s.btnlarge)}
            disabled={submitting}
            show={submitting}
            label={formatMessage(messages.verifyViaSms)}
            handleClick={this.submitForm}
          />
        </FormGroup>
      </div>
    )
  }

}

const mapState = (state) => ({
  profileId: state.account.data.profileId
});

const mapDispatch = {
  sendVerificationSms,
  openSmsVerificationModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(AddPhoneNumberForm);
