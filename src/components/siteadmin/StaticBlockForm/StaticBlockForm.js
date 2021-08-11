import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticBlockForm.css';
import BlockUploader from './BlockUploader';
import Uploader from './Uploader';

class StaticBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {

    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{error}</span>}

      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={className} maxLength={80} />
        {touched && error && <span className={s.errorMessage}>{error}</span>}

      </div>
    )
  }

  renderFormControlSelect({ input, label, placeholder, meta: { touched, error }, children, className, disabled }) {
    return (
      <FormGroup className={s.formGroup}>
        <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={12} lg={12} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <Col lg={12} md={12} sm={12} xs={12}>
                  <FormGroup className={s.formGroup}>
                    <Row>
                      <Col lg={6} sm={6} md={6} xs={12} className={s.noPadding}>
                        <Col
                          componentClass={ControlLabel}
                          xs={12} sm={12} md={12} lg={12}
                        >
                          <label className={s.labelText} >Header Title</label>
                        </Col>
                        <Col
                          componentClass={ControlLabel}
                          xs={12} sm={12} md={12} lg={12}
                        >
                          <Field
                            name="headerTitle"
                            type="text"
                            component={this.renderFormControl}
                            label={"Title"}
                          />
                        </Col>
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={6} className={s.noPadding}>
                        <Col xs={12} sm={12} md={12} lg={12} componentClass={ControlLabel}>
                          <label className={s.labelText} >Is Active</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} componentClass={ControlLabel}>
                          <Field name="isEnable" className={s.formControlSelect} component={this.renderFormControlSelect} label={"Footer Category"} >
                            <option value="1">Enable</option>
                            <option value="0">Disable</option>
                          </Field>
                        </Col>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.formGroup}>
                    <Row>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <label className={s.labelText} >Header Content</label>
                      </Col>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <Field
                          name="headerContent"
                          component={this.renderFormControlTextArea}
                          className={s.formControlInput}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <Col lg={12} md={12} sm={12} xs={12} className={s.noPadding}>
                    <h3>Block #1</h3>
                  </Col>
                  <Row>
                    <FormGroup className={s.formGroup}>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <label className={s.labelText} >Block Title 1</label>
                      </Col>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <Field
                          name="blockTitle1"
                          type="text"
                          component={this.renderFormControl}
                          label={"Title"}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <label className={s.labelText} >Block Content 1</label>
                      </Col>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <Field
                          name="blockContent1"
                          component={this.renderFormControlTextArea}
                          className={s.formControlInput}
                        />
                      </Col>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <label className={s.labelText} >Block Image 1</label>
                      </Col>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <BlockUploader />
                      </Col>
                    </FormGroup>
                  </Row>
                </Col>

                <Col lg={6} md={6} sm={6} xs={12}>
                  <Col lg={12} md={12} sm={12} xs={12} className={s.noPadding}>
                    <h3>Block #2</h3>
                  </Col>
                  <Row>
                    <FormGroup className={s.formGroup}>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <label className={s.labelText} >Block Title 2</label>
                      </Col>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <Field
                          name="blockTitle2"
                          type="text"
                          component={this.renderFormControl}
                          label={"Title"}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <label className={s.labelText} >Block Content 2</label>
                      </Col>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <Field
                          name="blockContent2"
                          component={this.renderFormControlTextArea}
                          className={s.formControlInput}
                        />
                      </Col>

                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <label className={s.labelText} >Block Image 2</label>
                      </Col>
                      <Col
                        componentClass={ControlLabel}
                        xs={12} sm={12} md={12} lg={12}
                      >
                        <Uploader />
                      </Col>
                    </FormGroup>
                  </Row>
                </Col>
                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Button
                      bsSize="small"
                      className={cx(s.button, s.btnPrimary, s.btnlarge)}
                      type="submit"
                      disabled={submitting}
                    >
                      Save
                    </Button>
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

StaticBlockForm = reduxForm({
  form: 'StaticBlockForm', // a unique name for this form
  validate
})(StaticBlockForm);

export default injectIntl(withStyles(s)(StaticBlockForm));
