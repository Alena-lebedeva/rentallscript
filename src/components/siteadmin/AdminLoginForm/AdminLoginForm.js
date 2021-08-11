import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';
import messages from './messages';

import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminLoginForm.css';

class AdminLoginForm extends Component {

  static propTypes = {
  };

  renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <p><label className={labelClass}>{label}</label></p>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl {...input} placeholder={placeholder} type={type} className={fieldClass} />
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const title = (
      <h2>Admin Login</h2>
    );

    return (
      <div className={cx(s.root, 'loginpage')}>
        <div className={s.container}>
          <Col md={12} lg={12} sm={12} xs={12} >
            <Panel className={s.panelHeader} header={title}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormGroup className={cx(s.formGroup, s.spaceTop)}>
                  <Field
                    name="email"
                    type="text"
                    component={this.renderField}
                    label={formatMessage(messages.email)}
                    placeholder={"Email Address"}
                    labelClass={s.labelText}
                    fieldClass={s.formControlInput}
                  />
                </FormGroup>
                <FormGroup className={s.formGroup}>
                  <Field
                    name="password"
                    type="password"
                    component={this.renderField}
                    label={formatMessage(messages.password)}
                    placeholder={"Password"}
                    labelClass={s.labelText}
                    fieldClass={s.formControlInput}
                  />
                </FormGroup>
                <div className={s.formGroup}>
                  <Button className={cx(s.button, s.btnPrimary)} type="submit" disabled={submitting}> Log in </Button>
                </div>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    )
  }

}

AdminLoginForm = reduxForm({
  form: 'AdminLoginForm', // a unique name for this form
  validate
})(AdminLoginForm);

export default injectIntl(withStyles(s)(AdminLoginForm));

