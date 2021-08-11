import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
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
import s from './ServiceFeesForm.css';

class ServiceFeesForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
    availableCurrencies: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired
    })).isRequired
  };

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

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <div className={cx(s.select, s.currencyselect)}>
              <FormControl componentClass="select" {...input} className={className} >
                {children}
              </FormControl>
            </div>
          </Col>
        </Row>
      </FormGroup>
    )
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { base, availableCurrencies } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                      <label className={s.labelText}>Guest Fee Type</label>
                    </Col>
                    <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                      <label className={s.labelText}>{' '}<Field name="guestType" component="input" type="radio" value="fixed" /> Fixed Price </label>
                      <label className={cx(s.labelText, s.labelPaddingLeft)}><Field name="guestType" component="input" type="radio" value="percentage" /> Percentage </label>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="guestValue" type="text" component={this.renderFormControl} label={"Guest Service Fee"} placeholder={"Amount/Percentage"} />
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                      <label className={s.labelText}>Host Fee Type</label>
                    </Col>
                    <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                      <label className={s.labelText}><Field name="hostType" component="input" type="radio" value="fixed" /> Fixed Price </label>
                      <label className={cx(s.labelText, s.labelPaddingLeft)}><Field name="hostType" component="input" type="radio" value="percentage" /> Percentage </label>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="hostValue" type="text" component={this.renderFormControl} label={"Host Service Fee"} placeholder={"Amount/Percentage"} />
                <Field name="currency" className={s.formControlSelect} component={this.renderFormControlSelect} label={"Currency"} >
                  <option value="">Choose Currency</option>
                  {
                    availableCurrencies.map((currency, key) => {
                      if (currency.isEnable === true) {
                        return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                      }
                    })
                  }
                </Field>
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

ServiceFeesForm = reduxForm({
  form: 'ServiceFeesForm', // a unique name for this form
  validate
})(ServiceFeesForm);

const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(ServiceFeesForm));
