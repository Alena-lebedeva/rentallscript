import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
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
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchSettingsForm.css';
import * as FontAwesome from 'react-icons/lib/fa';

import submit from './submit';
import validate from './validate';

class SearchSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  componentWillMount() {
    const { initialize, initialValues } = this.props;
    if (initialValues != undefined) {
      initialize(initialValues);
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={4} md={4} lg={4}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={8} md={8} lg={8}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl {...input} placeholder={label} type={type} className={className} />
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={4} md={4} lg={4}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={8} md={8} lg={8}>
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

    const { error, handleSubmit, submitting, dispatch, title } = this.props;
    const { base, availableCurrencies } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <Field name="minPrice" type="text" component={this.renderFormControl} label={"Minimum Price"} />
                <Field name="maxPrice" type="text" component={this.renderFormControl} label={"Maximum Price"} />
                <Field name="priceRangeCurrency" className={s.formControlSelect} component={this.renderFormControlSelect} label={"Price Range Currency"} >
                  {
                    availableCurrencies != null && availableCurrencies.length > 0 && availableCurrencies.map((currency, key) => {
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

SearchSettingsForm = reduxForm({
  form: 'SearchSettingsForm', // a unique name for this form
  validate
})(SearchSettingsForm);

const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(SearchSettingsForm));
