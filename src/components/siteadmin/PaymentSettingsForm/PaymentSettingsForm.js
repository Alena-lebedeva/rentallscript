import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import submit from './submit';

class PaymentSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
  };

  componentDidMount() {
    const { initialize, initialValues } = this.props;
    initialize(initialValues);
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => {
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


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <form onSubmit={handleSubmit(submit)}>
        {error && <strong>{formatMessage(error)}</strong>}
        <Field name="paymentName" type="text" component={this.renderField} label={"PaymentName"} />
        <div>
          <span> Payment Status </span>
          <Field name="paymentStatus" type="radio" component={"input"} value={"true"} /> Enable
          <Field name="paymentStatus" type="radio" component={"input"} value={"false"} /> Disable
        </div>
        <div>
          <span> Payment Mode </span>
          <Field name="paymentMode" type="radio" component={"input"} value={"live"} /> Live
          <Field name="paymentMode" type="radio" component={"input"} value={"sandbox"} /> Sandbox
        </div>
        <Field name="email" type="text" component={this.renderField} label={"Email Address"} />
        <Field name="APIUserId" type="text" component={this.renderField} label={"API User Id"} />
        <Field name="APIPassword" type="text" component={this.renderField} label={"API Password"} />
        <Field name="APISecret" type="text" component={this.renderField} label={"API Secret"} />
        <Field name="AppId" type="text" component={this.renderField} label={"App Id"} />
        <div>
          <button type="submit" disabled={submitting}>Save</button>
        </div>
      </form>
    )
  }

}

PaymentSettingsForm = reduxForm({
  form: 'PaymentSettingsForm', // a unique name for this form
  //validate
})(PaymentSettingsForm);

export default injectIntl(PaymentSettingsForm);
