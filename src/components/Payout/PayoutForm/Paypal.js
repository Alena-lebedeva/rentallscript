import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm } from 'redux-form';

import {
    Button,
    FormGroup,
    FormControl,
    Panel
} from 'react-bootstrap';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import logourl from './paypal.png';

// Helpers
import validate from './validate';
import submit from './submit';

// Locale
import messages from '../../../locale/messages';

class Paypal extends Component {
    static propTypes = {
        handleSubmit: PropTypes.any.isRequired,
        previousPage: PropTypes.any.isRequired,
        siteName: PropTypes.string.isRequired,
        formatMessage: PropTypes.any,
    };

    renderField = ({ input, label, type, meta: { touched, error, dirty } }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.space1}>
                <label className={s.labelText}>{label}</label>
                <FormGroup className={s.formGroup}>
                    {/* {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>} */}
                    <FormControl {...input} componentClass="input" className={cx(s.formControlInput, s.commonBorder)} />
                    {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                </FormGroup>
            </div>
        );
    }

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {/* {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>} */}
                <FormControl componentClass="select" {...input} className={className} >
                    {children}
                </FormControl>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    render() {
        const { handleSubmit, pristine, previousPage, submitting } = this.props;
        const { base, availableCurrencies, siteName } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={'inputFocusColor'}>

                <form onSubmit={handleSubmit(submit)}>
                    <Panel className={s.panelHeader}
                        header={formatMessage(messages.addPayout)}
                        footer={
                            <div>
                                <Button className={cx(s.button, s.btnlarge, s.btnPrimaryBorder, s.btnRight)} onClick={previousPage}>
                                    <FormattedMessage {...messages.back} />
                                </Button>
                                <Button
                                    className={cx(s.button, s.btnPrimary, s.btnlarge)}
                                    type="submit"
                                    disabled={pristine || submitting}
                                ><FormattedMessage {...messages.finish} /></Button>
                            </div>
                        }>
                        <div className={s.panelBody}>
                            <img src={logourl} height="100" width="100" />
                            <p className={s.payoutIntro}>
                                <FormattedMessage {...messages.paypalIntro1} /> {siteName}.
                   <FormattedMessage {...messages.paypalIntro2} /> {siteName}, <FormattedMessage {...messages.paypalIntro3} />
                                {' '}<a><FormattedMessage {...messages.paypalIntro4} /></a>
                            </p>

                            <Field name="payEmail" component={this.renderField} label={formatMessage(messages.paypalEmail)} />

                            <div className={s.space1}>
                                <label className={s.labelText}><FormattedMessage {...messages.paypalCurrency} /></label>
                                <FormGroup className={s.formGroup}>
                                    <Field name="currency" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.commonBorder)} >
                                        <option value="">{formatMessage(messages.chooseCurrency)}</option>
                                        {
                                            availableCurrencies.map((currency, key) => {
                                                if (currency.isEnable === true) {
                                                    return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                                                }
                                            })
                                        }
                                    </Field>
                                </FormGroup>
                            </div>
                        </div>
                    </Panel>
                </form>
            </div>

        );
    }
}

Paypal = reduxForm({
    form: 'PayoutForm', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(Paypal);

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    availableCurrencies: state.currency.availableCurrencies,
    base: state.currency.base,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Paypal)));