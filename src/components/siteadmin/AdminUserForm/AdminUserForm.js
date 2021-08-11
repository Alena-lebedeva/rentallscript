// General
import React, { Component } from 'react';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Translation
import { injectIntl } from 'react-intl';
import messages from './messages';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AdminUserForm.css';
import {
  Button,
  FormGroup,
  FormControl,
  Checkbox,
  Col,
  Row,
} from 'react-bootstrap';

import { getAllAdminPrivileges } from '../../../helpers/adminPrivileges';

class AdminUserForm extends Component {

  static defaultProps = {
    roles: []
  };

  constructor(props) {
    super(props);
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
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, id, roles } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.formGroup}>
            <label>Email</label>
            <Field
              name="email"
              type="text"
              component={this.renderFormControl}
              label={'Email'}
              className={cx(s.formControlInput)}
            />
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <label>Password</label>
            <Field
              name="password"
              type="password"
              component={this.renderFormControl}
              label={'Password'}
              className={cx(s.formControlInput)}
            />
            <p className={s.userText}>Provide new password only. Ignore this field to use the existing password for this user.</p>
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <label>Role</label>
            <Field
              name="roleId"
              component={this.renderFormControlSelect}
              className={s.adminUserSelect}
            >
              <option value={''}>Select Role</option>
              {
                roles && roles.length > 0 && roles.map((item, key) => {
                  return (
                    <option value={item.id} key={key}>{item.name}</option>
                  )
                })
              }
            </Field>  
          </FormGroup>

          <FormGroup className={s.formGroup}>
            <Row>
              <Col xs={12} sm={3} md={3} lg={3} className={cx(s.btnAlignRight)}>
                <Button className={cx(s.button, s.btnPrimary)} bsSize="large" type="submit" disabled={submitting}>
                  {id ? "Update" : "Add"}
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </div>
    )
  }

}

AdminUserForm = reduxForm({
  form: "AdminUserForm", // a unique name for this form
  validate,
})(AdminUserForm);

const selector = formValueSelector('AdminUserForm');

const mapState = (state) => ({
  id: selector(state, 'id')
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdminUserForm)));
