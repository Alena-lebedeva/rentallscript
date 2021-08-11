import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { connect } from 'react-redux';
import normalizePhone from './normalizePhone';

// Style
import cx from 'classnames';
import {
  Button,
  Form,
  Grid,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditUserForm.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import Link from '../../Link';

class EditUserForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {

    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
        >
          {children}
        </FormControl>
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <FormControl {...input} placeholder={label} type={type} className={className} />
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title, availableCurrencies } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                    <label className={s.labelText} >First Name</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <Field name="firstName" type="text" component={this.renderFormControl} label={"First Name"} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                    <label className={s.labelText} >Last Name</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <Field name="lastName" type="text" component={this.renderFormControl} label={"Last Name"} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                    <label className={s.labelText} >Gender</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <div className={s.select}>
                      <Field name="gender" className={s.formControlSelect} component={this.renderFormControlSelect} >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                    <label className={s.labelText} >Date Of Birth</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <Field name="dateOfBirth" type="date" component={this.renderFormControl} label={"Date Of Birth"} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                    <label className={s.labelText} >Phone Number</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <Field name="phoneNumber" type="text" component={this.renderFormControl} label={"Phone Number"} normalize={normalizePhone} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} >
                    <label className={s.labelText} >Preferred Language</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <div className={s.select}>
                      <Field name="preferredLanguage" className={s.formControlSelect} component={this.renderFormControlSelect} >
                        <option value="id">Bahasa Indonesia</option>
                        <option value="ms">Bahasa Melayu</option>
                        <option value="ca">Català</option>
                        <option value="da">Dansk</option>
                        <option value="de">Deutsch</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="el">Eλληνικά</option>
                        <option value="fr">Français</option>
                        <option value="it">Italiano</option>
                        <option value="hu">Magyar</option>
                        <option value="nl">Nederlands</option>
                        <option value="no">Norsk</option>
                        <option value="pl">Polski</option>
                        <option value="pt">Português</option>
                        <option value="fi">Suomi</option>
                        <option value="sv">Svenska</option>
                        <option value="tr">Türkçe</option>
                        <option value="is">Íslenska</option>
                        <option value="cs">Čeština</option>
                        <option value="ru">Русский</option>
                        <option value="th">ภาษาไทย</option>
                        <option value="zh">中文 (简体)</option>
                        <option value="zh-TW">中文 (繁體)</option>
                        <option value="ja">日本語</option>
                        <option value="ko">한국어</option>
                      </Field>
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} >
                    <label className={s.labelText} >Preferred Currency</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <div className={s.select}>
                      <Field name="preferredCurrency" className={s.formControlSelect} component={this.renderFormControlSelect} >
                        {
                          availableCurrencies.map((currency, key) => {
                            if (currency.isEnable === true) {
                              return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                            }
                          })
                        }
                      </Field>
                    </div>

                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} >
                    <label className={s.labelText} >Location</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <Field name="location" type="text" component={this.renderFormControl} label={"Location"} className={s.formControlInput} placeholder="e.g. Paris, France /Brooklyn, NY, IL" />
                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} >
                    <label className={s.labelText} >Info</label>
                  </Col>
                  <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                    <Field name="info" component={this.renderFormControlTextArea} className={s.formControlInput} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Save</Button>
                    <Link to={"/siteadmin/users/"}> Go Back </Link>
                  </Col>
                </FormGroup>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    )
  }

}

EditUserForm = reduxForm({
  form: 'EditUserForm', // a unique name for this form
  validate
})(EditUserForm);


const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(EditUserForm));
