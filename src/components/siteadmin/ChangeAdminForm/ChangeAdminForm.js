import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';

// Style
import {
  Button,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel,
  Row
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangeAdminForm.css';

import validate from './validate';

class ChangeAdminForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, note }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl {...input} placeholder={label} type={type} className={className} />
            {
              note && <p className={s.labelText}>{note}</p>
            }
          </Col>
        </Row>
      </FormGroup>
    );
  }

  async submitForm(values, dispatch) {
    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });

    if (data && data.changeAdminUser) {
      if (data.changeAdminUser.status === '200') {
        toastr.success("Changed Successfully!", "Admin access details changed successfully!");
      } else {
        toastr.error("Failed to update!", "Your changes to admin access details is failed!");
      }
    }
    dispatch(reset('ChangeAdminForm'));
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, title, isSuperAdmin } = this.props;

   

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(this.submitForm)}>
                {error && <strong>{error}</strong>}
                {
                  isSuperAdmin && <Field
                    name="email"
                    type="text"
                    component={this.renderFormControl}
                    label={"Email Address"}
                    note={"Leave email address field blank if you don't want to change the email"}
                  />
                }
                <Field name="password" type="password" component={this.renderFormControl} label={"Password"} />
                <Field name="confirmPassword" type="password" component={this.renderFormControl} label={"Confirm Password"} />
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Save</Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }

}

ChangeAdminForm = reduxForm({
  form: 'ChangeAdminForm', // a unique name for this form
  validate
})(ChangeAdminForm);

const mapState = (state) => ({
  isSuperAdmin: state.runtime.isSuperAdmin,
});

const mapDispatch = {};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation changeAdminUser($email: String, $password: String!) {
      changeAdminUser (email: $email, password: $password) {
        status
      }
    }
  `),
)(ChangeAdminForm);
