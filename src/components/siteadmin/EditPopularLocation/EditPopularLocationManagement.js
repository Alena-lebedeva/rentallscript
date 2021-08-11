import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditPopularLocationManagement.css';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

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
import Uploader from './Uploader';
import PlaceGeoSuggest from './PlaceGeoSuggest';

import { databaseUrl, analytics, googleMapAPI, payment, googleCaptcha, emailConfig, sms, auth } from '../../../config';

class EditPopularLocationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    data: []
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl {...input} placeholder={label} type={type} className={className} />
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderPlacesSuggest = ({ input, label, meta: { touched, error }, className }) => {
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <PlaceGeoSuggest
          {...input}
          label={label}
          className={className}
          formName={'EditPopularLocation'}
        />
      </div>
    )
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { data } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'addpopular-autocomplete')}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                      <label className={s.labelText} >Image</label>
                    </Col>
                    <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                      <Uploader values={initialValues} />
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="location" type="text" component={this.renderFormControl} label={"Location"} />
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col
                      componentClass={ControlLabel}
                      xs={12} sm={3} md={3} lg={3}
                    >
                      <label className={s.labelText} >Location Address</label>
                    </Col>
                    <Col
                      componentClass={ControlLabel}
                      xs={12} sm={9} md={9} lg={9}
                    >

                      <Field
                        name="locationAddress"
                        type="text"
                        component={this.renderPlacesSuggest}
                        label={"Location Address"}
                      />
                    </Col>
                  </Row>
                </FormGroup>
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

EditPopularLocationManagement = reduxForm({
  form: 'EditPopularLocation', // a unique name for this form
  validate
})(EditPopularLocationManagement);

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditPopularLocationManagement)));



