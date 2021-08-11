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
import s from './AdminRolesForm.css';
import {
  Button,
  FormGroup,
  FormControl,
  Checkbox,
  Col,
  Row,
} from 'react-bootstrap';

import { getAllAdminPrivileges } from '../../../helpers/adminPrivileges';

// Internal Components
import CustomCheckbox from '../../CustomCheckbox';

class AdminRolesForm extends Component {

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

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  renderCheckbox = ({ input, label, meta: { touched, error }, options, className }) => {
    const { formatMessage } = this.props.intl;
    let currentValue = input.value || [];

    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <Row>
          {
            options && options.length > 0 && options.map((option, index) => {
              return (
                <Col lg={6} md={6} key={index} className={className}>
                  <div className={s.table}>
                    <div className={s.tableRow}>
                      <div className={cx(s.tableCell, s.checkBoxWidth)}>
                        <CustomCheckbox
                          {...input}
                          className={'icheckbox_square-green'}
                          value={option.id}
                          name={`${input.name}[${index}]`}
                          checked={currentValue.indexOf(option.id) !== -1}
                          onChange={(event) => {
                            const newValue = [...currentValue] || [];
                            if (event === true) {
                              newValue.push(option.id);
                            } else {
                              newValue.splice(newValue.indexOf(option.id), 1);
                            }
                            return input.onChange(newValue);
                          }}
                        />
                      </div>
                      <div className={cx(s.tableCell, s.textWidth)}>
                        {' ' + option.privilege}
                      </div>
                    </div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
    );
  }

  render() {
    const { error, handleSubmit, submitting, id } = this.props;
    const { formatMessage } = this.props.intl;

    let privileges = getAllAdminPrivileges();

    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.formGroup}>
            <label>Role Name</label>
            <Field
              name="name"
              type="text"
              component={this.renderFormControl}
              label="Name"
              className={cx(s.formControlInput)}
            />
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <label>Description</label>
            <Field
              name="description"
              component={this.renderFormControlTextArea}
              label="Description"
              className={cx(s.formControlInput, s.space3)}
            />
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <label>Privileges</label>
            <Field
              name="privileges"
              component={this.renderCheckbox}
              options={privileges}
              className={cx(s.space3)}
            />
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

AdminRolesForm = reduxForm({
  form: "AdminRolesForm", // a unique name for this form
  validate,
})(AdminRolesForm);

const selector = formValueSelector('AdminRolesForm');

const mapState = (state) => ({
  id: selector(state, 'id')
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdminRolesForm)));
