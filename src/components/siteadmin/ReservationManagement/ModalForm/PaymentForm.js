import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
// Redux
import { connect } from 'react-redux';

import {
	Button,
	FormGroup,
	Col,
	ControlLabel,
	FormControl
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ModalForm.css';

import validate from './validate';
import submit from './submit';

// Components
import CurrencyConverter from '../../../CurrencyConverter';

class PaymentForm extends Component {
	static propTypes = {
		availableCurrencies: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			symbol: PropTypes.string.isRequired,
			isEnable: PropTypes.bool.isRequired,
			isPayment: PropTypes.bool.isRequired
		})),
		type: PropTypes.string,
		reservationId: PropTypes.number,
		email: PropTypes.string,
		payoutId: PropTypes.number,
		amount: PropTypes.number,
		amountCurrency: PropTypes.string,
		paymentMethodId: PropTypes.number
	};

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
			<FormGroup className={s.formGroup}>
				<Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
					<label className={s.labelText} >{label}</label>
				</Col>
				<Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
					{touched && error && <span className={s.errorMessage}>{error}</span>}
					<div className={s.select}>
						<FormControl componentClass="select" {...input} className={className} >
							{children}
						</FormControl>
					</div>
				</Col>
			</FormGroup>
		)
	}

	render() {
		const { error, handleSubmit, submitting } = this.props;
		const { availableCurrencies } = this.props;
		const { type, reservationId, email, payoutId, amount, amountCurrency, paymentMethodId, last4Digits } = this.props;
		let typeLabel;
		if (type === 'host') {
			typeLabel = 'Host Payout';
		} else {
			typeLabel = 'Refund to Guest';
		}

		return (
			<form onSubmit={handleSubmit(submit)}>
				{error && <strong>{error}</strong>}
				<FormGroup className={s.formGroup}>
					<Col xs={12} sm={3} md={3} lg={3}>
						<label className={s.labelText} >Type</label>
					</Col>
					<Col xs={12} sm={9} md={9} lg={9}>
						<span>{typeLabel}</span>
					</Col>
				</FormGroup>

				<FormGroup className={s.formGroup}>
					<Col xs={12} sm={3} md={3} lg={3}>
						<label className={s.labelText} >Amount</label>
					</Col>
					<Col xs={12} sm={9} md={9} lg={9}>
						<CurrencyConverter
							amount={amount}
							from={amountCurrency}
						/>
					</Col>

				</FormGroup>

				<FormGroup className={s.formGroup}>
					<Col xs={12} sm={3} md={3} lg={3}>
						<label className={s.labelText} >Receiver</label>
					</Col>
					<Col xs={12} sm={9} md={9} lg={9}>
						{
							(type != 'host' || paymentMethodId == 1) && <span>
								{email}
							</span>
						}
						{
							type == 'host' && paymentMethodId == 2 && <span>
								****{last4Digits}
							</span>
						}
					</Col>
				</FormGroup>
				{
					paymentMethodId == 1 && <Field
						name="paymentCurrency"
						component={this.renderFormControlSelect}
						label={"Currency"}
						className={s.formControlSelect}
					>
						<option value="">Choose Currency</option>
						{
							availableCurrencies != null && availableCurrencies.length > 0 && availableCurrencies.map((currency, index) => {
								if (currency.isEnable === true && currency.isPayment) {
									return <option key={index} value={currency.symbol}>{currency.symbol}</option>
								}
							})
						}
					</Field>
				}
				<FormGroup className={s.formGroup}>
					<Button
						className={cx(s.button, s.btnPrimary)}
						bsSize="large"
						block
						type="submit"
						disabled={submitting || error}
					>
						Confirm
			        </Button>
				</FormGroup>
			</form>
		);
	}
}

PaymentForm = reduxForm({
	form: 'ReservationPaymentForm', // a unique name for this form
	validate
})(PaymentForm);

const selector = formValueSelector('ReservationPaymentForm');

const mapState = (state) => ({
	availableCurrencies: state.currency.availableCurrencies,
	type: selector(state, 'type'),
	reservationId: selector(state, 'reservationId'),
	email: selector(state, 'receiverEmail'),
	payoutId: selector(state, 'payoutId'),
	amount: selector(state, 'amount'),
	amountCurrency: selector(state, 'currency'),
	paymentMethodId: selector(state, 'paymentMethodId'),
	last4Digits: selector(state, 'last4Digits'),
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(PaymentForm));
