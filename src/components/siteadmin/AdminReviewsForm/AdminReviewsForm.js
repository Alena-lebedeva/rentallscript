import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { graphql, compose } from 'react-apollo';

import { Field, reduxForm, reset } from 'redux-form';
import validate from './validate';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviewsForm.css';

// Component
import AdminStarRating from '../AdminStarRating';
import { toastr } from 'react-redux-toastr';

// GraphQL
import WriteAdminReviewMutation from './WriteAdminReviewMutation.graphql';
import history from '../../../core/history';

class AdminReviewsForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
    return (

      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl {...input} placeholder={placeholder} type={type} className={className} />
          </Col>
        </Row>
      </FormGroup>

    );
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, className, children }) => {
    return (

      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl
              {...input}
              className={className}
              placeholder={label}
              componentClass={"textarea"}
            />
          </Col>
        </Row>
      </FormGroup>

    )
  }

  renderStarRating = ({ input, label, meta: { touched, error }, className, children }, value) => {
    return (

      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            <span className={s.starSize}>
              {touched && error && <span className={s.errorMessage}>{error}</span>}
              <AdminStarRating
                name={input.name}
                change={input.onChange}
                value={input.value}
                editing={true}
              />
            </span>
          </Col>
        </Row>
      </FormGroup>

    )
  }

  async submitForm(values, dispatch) {
    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });
    if (data && data.writeAdminReview) {
      if (data.writeAdminReview.status === '200') {
        if (values.id) {
          toastr.success("Updated Successfully!", "Admin review details updated successfully!");
        } else {
          toastr.success("Submitted Successfully!", "Admin review details submitted successfully!");
          dispatch(reset('AdminReviewsForm'));
        }
      } else if (data.writeAdminReview.status === '404') {
        toastr.error("Failed to update!", "List ID is not available!");
      } else {
        toastr.error("Failed to update!", "Your changes to admin review is failed!");
      }
      history.push('/siteadmin/reviews')
    }
  }

  render() {

    const { error, handleSubmit, submitting, title, initialValues } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(this.submitForm)}>
                {error && <strong>{error}</strong>}
                <Field name="listId" type="text"
                  component={this.renderFormControl}
                  label={"List ID"}
                  placeholder={"List ID"} />
                <Field name="reviewContent"
                  component={this.renderFormControlTextArea}
                  className={s.textareaInput}
                  label="Review Content"
                />
                <Field name="rating"
                  component={this.renderStarRating}
                  label={"Overall Rating"} />
                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Submit</Button>
                  </Col>
                </FormGroup>
              </form>
            </Panel>
          </Col>


        </div>




      </div>

    );
  }

}

AdminReviewsForm = reduxForm({
  form: 'AdminReviewsForm', // a unique name for this form
  validate
})(AdminReviewsForm);

export default compose(
  withStyles(s),
  graphql(WriteAdminReviewMutation)
)(AdminReviewsForm);
