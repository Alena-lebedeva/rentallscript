// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux Form
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';

import submit from './submit';
import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Helper
import PopulateData from '../../helpers/populateData';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EditProfileForm.css';
import {
  Button,
  Form,
  Row,
  Col,
  ControlLabel,
  FormControl,
  Panel,
  InputGroup
} from 'react-bootstrap';

// Internal Components
import PhoneVerificationModal from '../PhoneVerificationModal';
import CountryList from '../CountryList';

class EditProfileForm extends Component {

  static propTypes = {
    loadAccount: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthData: {},
      countryCode: 'IN',
      country: '+91',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentDidMount() {
    const { change, initialValues } = this.props;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }
    change('loggedinEmail', loggedinEmail);

    if (initialValues && initialValues.countryName && initialValues.countryCode) {
      this.setState({
        countryCode: initialValues.countryName,
        country: initialValues.countryCode
      });
    }

  }

  componentWillReceiveProps() {
    const { change, initialValues } = this.props;
    const { country, countryCode } = this.state;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }

    change('loggedinEmail', loggedinEmail);

    if (countryCode && country) {
      change('countryCode', countryCode);
      change('dialCode', country);
    }
  }

  componentWillMount() {
    let now = new Date();
    let currentYear = now.getFullYear();
    let years = PopulateData.generateData(1920, currentYear, "desc");
    let days = PopulateData.generateData(1, 31);
    let months = PopulateData.generateData(0, 11);
    this.setState({
      dateOfBirthData: {
        years: years,
        months: months,
        days: days
      }
    });
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea" rows={5}
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={className} disabled={isDisabled} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlEmail = ({ input, label, type, meta: { touched, error }, className, disabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={className} disabled={disabled} />
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

  renderFormControlCurrency = ({ input, label, type, meta: { touched, error }, className, country }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.margintop15}>
        <InputGroup>
          <InputGroup.Addon className={s.addonStyle}>
            {country}
          </InputGroup.Addon>
          <FormControl {...input} placeholder={label} type={type} className={className} />
        </InputGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCountryChange(e, selectedData) {
    this.setState({
      country: selectedData.dialCode,
      countryCode: selectedData.countryCode
    });
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, base, availableCurrencies, initialValues } = this.props;
    const { formatMessage } = this.props.intl;
    const { siteSettingStatus } = this.props;
    const { dateOfBirthData } = this.state;
    const { country, countryCode } = this.state;

    let isPhoneStatus = siteSettingStatus && siteSettingStatus.phoneNumberStatus == 1 ? true : false;

    const title = <h3>{formatMessage(messages.RequiredDetails)}</h3>;
    return (
      <div className={'inputFocusColor'}>
        {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <Panel className={s.panelHeader} header={title}>
          <Form onSubmit={handleSubmit(submit)}>
            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.firstName)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="firstName"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.firstName)}
                  className={cx(s.formControlInput, s.commonBorder)}
                />
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.lastName)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="lastName"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.lastName)}
                  className={cx(s.formControlInput, s.commonBorder)}
                />
                <p className={s.labelText}>{formatMessage(messages.lastNameInfo)}</p>
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.iAm)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <div className={s.select}>
                  <Field name="gender" className={cx(s.formControlSelect, s.commonBorder)} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.gender)}</option>
                    <option value="Male">{formatMessage(messages.genderMale)}</option>
                    <option value="Female">{formatMessage(messages.genderFemale)}</option>
                    <option value="Other">{formatMessage(messages.genderOther)}</option>
                  </Field>
                </div>
                <p className={s.labelText}>{formatMessage(messages.genderInfo)}</p>
              </Col>
            </Row>

            <Row className={cx(s.formGroup)} >
              <Col xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.dateOfBirth)}</label>
              </Col>

              <Col xs={12} sm={9} md={9} lg={9}>
                <div className={cx(s.select, s.birthDayWidth)}>
                  <Field name="month" className={cx(s.formControlSelect, s.commonBorder)} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.month)}</option>
                    {
                      dateOfBirthData.months.map((item, key) => {
                        return (
                          <option key={key} value={item}>{item + 1}</option>
                        )
                      })
                    }
                  </Field>
                </div>

                <div className={cx(s.select, s.birthDayWidth)}>
                  <Field name="day" className={cx(s.formControlSelect, s.commonBorder)} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.day)}</option>
                    {
                      dateOfBirthData.days.map((item, key) => {
                        return (
                          <option key={key} value={item}>{item}</option>
                        )
                      })
                    }
                  </Field>
                </div>

                <div className={cx(s.select, s.smSpace, s.birthDayWidth)}>
                  <Field name="year" className={cx(s.formControlSelect, s.commonBorder)} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.year)}</option>
                    {
                      dateOfBirthData.years.map((item, key) => {
                        return (
                          <option key={key} value={item}>{item}</option>
                        )
                      })
                    }
                  </Field>
                </div>
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.email)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="email"
                  type="text"
                  component={this.renderFormControlEmail}
                  label={formatMessage(messages.email)}
                  className={cx(s.formControlInput, s.commonBorder)}
                  disabled={true}
                />
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.phoneNumber)}</label>
              </Col>
              <Col xs={12} sm={9} md={9} lg={9}>
                {/* {
                  !isPhoneStatus && <Field 
                    name="phoneNumber"
                    type="text"
                    component={this.renderFormControl}
                    label={formatMessage(messages.phoneNumber)}
                    className={cx(s.formControlInput, s.commonBorder)}
                  />
                } */}
                {!isPhoneStatus && <div className={s.widthredcd}>
                  <CountryList
                    input={
                      {
                        name: 'countryCode',
                        onChange: this.handleChange,
                        value: countryCode,
                      }
                    }
                    className={cx(s.formControlSelect)}
                    dialCode={false}
                    getSelected={this.handleCountryChange}
                    formName={'EditProfileForm'}

                  />
                  <Field
                    name="phoneNumber"
                    type="text"
                    component={this.renderFormControlCurrency}
                    label={formatMessage(messages.phoneNumber)}
                    className={s.formControlInput}
                    onChange={this.handleChange}
                    country={country}
                  />
                </div>}
                {
                  isPhoneStatus && <PhoneVerificationModal />
                }
                <p className={s.labelText}>{formatMessage(messages.phoneNumberInfo)}</p>
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.preferredLanguage)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <div>
                  <Field name="preferredLanguage" className={cx(s.formControlSelect, s.formControlSelectWidth, s.commonBorder)} component={this.renderFormControlSelect} >
                    <option value="">Choose Language</option>
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
                  <p className={s.labelText}>{formatMessage(messages.preferredLanguageInfo)}</p>
                </div>
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.preferredCurrency)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <div>

                  <Field name="preferredCurrency" className={cx(s.formControlSelect, s.formControlSelectWidth, s.commonBorder)} component={this.renderFormControlSelect} >
                    <option value="">{formatMessage(messages.chooseCurrency)}</option>
                    {
                      availableCurrencies.map((currency, key) => {
                        if (currency.isEnable === true) {
                          return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                        }
                      })
                    }
                  </Field>
                  <p className={s.labelText}>{formatMessage(messages.preferredCurrencyInfo)}</p>
                </div>

              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.liveLocation)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="location"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.liveLocation)}
                  className={cx(s.formControlInput, s.commonBorder)}
                  placeholder="e.g. Paris, France /Brooklyn, NY, IL"
                />
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                <label className={s.labelText} >{formatMessage(messages.info)}</label>
              </Col>
              <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                <Field name="info"
                  component={this.renderFormControlTextArea}
                  className={cx(s.formControlInput, s.commonBorder)}
                />
              </Col>
            </Row>

            <Row className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.spaceTop3}>
                <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting}
                >
                  {formatMessage(messages.save)}
                </Button>
              </Col>
            </Row>
          </Form>
        </Panel>
      </div>
    )
  }

}
EditProfileForm = reduxForm({
  form: 'EditProfileForm', // a unique name for this form
  validate,
})(EditProfileForm);
const selector = formValueSelector('EditProfileForm');

const mapState = (state) => ({
  initialValues: state.account.data,
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
  siteSettingStatus: state.siteSettings.data,
  phoneNumber: selector(state, 'phoneNumber')
});
const mapDispatch = {
  change
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getCountries {
          getCountries{
              id
              countryCode
              countryName
              isEnable
              dialCode
          }
      }
  `, {
      options: {
        ssr: false,
        fetchPolicy: 'network-only'
      }
    })
)(EditProfileForm);