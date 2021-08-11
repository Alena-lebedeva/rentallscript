import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux form
import { Field, reduxForm } from 'redux-form';

import submit from './submit';
import validate from './validate';

// Style
import {
  Button,
  Row, FormGroup,
  Col,
  FormControl,
  Panel
} from 'react-bootstrap';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePasswordForm.css';

// Locale
import messages from '../../../locale/messages';

class ChangePasswordForm extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    initialValues: PropTypes.shape({
      registeredType: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    initialValues: {
      registeredType: 'email'
    }
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.formGroup}>
        <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
          <FormControl {...input} type={type} className={s.formControlInput}
            placeholder={label}
          />
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </Col>
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Panel className={s.panelHeader} header={formatMessage(messages.changePassword)}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <form onSubmit={handleSubmit(submit)}>
            <Row>
              {error && <strong>{error}</strong>}
              <Field name="newPassword" type="password" component={this.renderFormControl} label={formatMessage(messages.newPassword)} />
              <Field name="confirmPassword" type="password" component={this.renderFormControl} label={formatMessage(messages.confirmPassword)} />
              <FormGroup className={s.formGroup}>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.textRight, s.space2, s.spaceTop2)}>
                  <Button className={cx(s.button, s.btnPrimary)} type="submit" disabled={submitting}>
                    <FormattedMessage {...messages.saveAndContinue} />
                  </Button>
                </Col>
              </FormGroup>
            </Row>
          </form>
        </Col>
      </Panel>
    );
  }
}

ChangePasswordForm = reduxForm({
  form: 'ChangeForgotPasswordForm', // a unique name for this form
  validate
})(ChangePasswordForm);

export default injectIntl(withStyles(s)(ChangePasswordForm));
