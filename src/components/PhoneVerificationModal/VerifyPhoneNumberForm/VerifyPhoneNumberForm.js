// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, reset } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

import { toastr } from 'react-redux-toastr';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './VerifyPhoneNumberForm.css';

import {
  FormGroup,
  Col,
  Row,
  FormControl
} from 'react-bootstrap';

import { graphql, gql, compose } from 'react-apollo';

// Redux Action
import { openSmsVerificationModal, closeSmsVerificationModal } from '../../../actions/SmsVerification/modalActions';

import getPhoneDataQuery from '../getUserData.graphql';

// Internal Components
import Loader from '../../Loader';

class VerifyPhoneNumberForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      submitting: false,
      error: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { formatMessage } = this.props.intl;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm() {
    const { mutate } = this.props;
    const { formatMessage } = this.props.intl;
    const { verificationCode } = this.state;
    let error = null, submitting = false;
    if (!verificationCode) {
      error = {
        verificationCode: formatMessage(messages.required)
      };
    } else if (isNaN(verificationCode)) {
      error = {
        verificationCode: formatMessage(messages.required)
      };
    }

    submitting = (error === null) ? true : false;

    this.setState({
      submitting,
      error
    });

    if (error === null && submitting) {
      const { data } = await mutate({
        variables: {
          verificationCode
        },
        refetchQueries: [{
          query: getPhoneDataQuery
        }]
      });

      if (data && data.VerifyPhoneNumber) {
        if (data.VerifyPhoneNumber.status === '200') {
          toastr.success("Success!", "Phone number has been verified successfully.");
        } else {
          error = {
            verificationCode: 'We were unable to validate your phone number. Please try again.'
          };
        }
      }
    }

    if (this.refs.verifyPhoneNumberForm) {
      this.setState({ submitting: false, error });
    }

  }

  render() {
    const { openSmsVerificationModal, countryCode, phoneNumber, closeSmsVerificationModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { verificationCode, submitting, error } = this.state;

    return (
      <div className={s.formContainer} ref="verifyPhoneNumberForm">
        <FormGroup className={s.formGroup}>
          <label className={s.labelText} >
            <FormattedMessage {...messages.weHaveSentVerificationCode} />
            {' ' + countryCode}{' ' + phoneNumber}.
          </label>
        </FormGroup>

        <FormGroup className={s.formGroup}>
          <Row>
            <Col md={8} sm={7} xs={12}>
              <label className={s.labelText} >
                <FormattedMessage {...messages.verificationCodeLabel} />:
              </label>
            </Col>
            <Col md={4} sm={5} xs={12}>
              <FormControl
                name={'verificationCode'}
                value={verificationCode}
                placeholder={''}
                type={'text'}
                maxLength={4}
                className={cx(s.formControlInput)}
                onChange={this.handleChange} />
            </Col>
          </Row>
        </FormGroup>
        {error && error.verificationCode && <span className={s.errorMessage}>{error.verificationCode}</span>}

        <FormGroup className={cx(s.formGroup)}>
          {/* <Button 
            className={cx(s.button, s.btnPrimary, s.btnLarge, s.marginRight)} 
            type="button" 
            onClick={this.submitForm}
            disabled={submitting}>
            Verify
          </Button> */}
          <Loader
            containerClass={s.btnContainer}
            type={"button"}
            buttonType={"button"}
            className={cx(s.button, s.btnPrimary, s.btnLarge, s.marginRight)}
            disabled={submitting}
            show={submitting}
            label={'Verify'}
            handleClick={this.submitForm}
          />
          <a
            className={cx(s.modalCaptionLink)}
            href={'javascript:void(0)'}
            onClick={closeSmsVerificationModal}
          >
             <FormattedMessage {...messages.cancel} />
          </a>
        </FormGroup>
        <label className={s.labelText} > <FormattedMessage {...messages.verificationDesc} /></label>
      </div>
    )
  }

}

const mapState = (state) => ({
  profileId: state.account.data.profileId
});

const mapDispatch = {
  openSmsVerificationModal,
  closeSmsVerificationModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation VerifyPhoneNumber($verificationCode: Int!) {
      VerifyPhoneNumber(verificationCode: $verificationCode) {
          status
      }
    }
  `)
)(VerifyPhoneNumberForm);
