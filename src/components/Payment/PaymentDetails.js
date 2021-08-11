import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import {
	Row,
	Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

import CurrencyConverter from '../CurrencyConverter';

// Locale
import messages from '../../locale/messages';

class PaymentDetails extends Component {
	static propTypes = {
		checkIn: PropTypes.string.isRequired,
		checkOut: PropTypes.string.isRequired,
		total: PropTypes.number.isRequired,
		basePrice: PropTypes.number.isRequired,
		cleaningPrice: PropTypes.number.isRequired,
		discount: PropTypes.number,
		discountType: PropTypes.string,
		serviceFee: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
	};

	render() {
		const { formatMessage } = this.props.intl;
		const { checkIn, checkOut, basePrice, cleaningPrice, total } = this.props;
		const { discount, discountType, serviceFee, currency } = this.props;
		let momentStartDate, momentEndDate, dayDifference, priceForDays;

		if (checkIn != null && checkOut != null) {
			momentStartDate = moment(checkIn);
			momentEndDate = moment(checkOut);
			dayDifference = momentEndDate.diff(momentStartDate, 'days');
			priceForDays = Number(basePrice) * Number(dayDifference);
		}
		let subTotal = total + serviceFee;

		return (
			<div>
				<div>
					<Row>
						<Col xs={12} sm={12} md={12} lg={12}>
							<table className={cx('table')}>
								<thead>
									<tr>
										<th className={cx('hide')}><FormattedMessage {...messages.tabDescription} /></th>
										<th className={cx('hide')}><FormattedMessage {...messages.transferAmount} /></th>
									</tr>
								</thead>
								<tbody>
									<tr className={s.tableText}>
										<td className={cx(s.noBorder)}>
											<span>
												<CurrencyConverter
													amount={basePrice}
													from={currency}
												/>
											</span>
											<span>
												x {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
											</span>
										</td>
										<td className={cx(s.noBorder, 'text-right')}>
											<span>
												<CurrencyConverter
													amount={priceForDays}
													from={currency}
												/>
											</span>
										</td>
									</tr>
									{
										cleaningPrice > 0 && <tr className={s.tableText}>
											<td className={cx(s.noBorder)}><FormattedMessage {...messages.cleaningFee} /></td>
											<td className={cx(s.noBorder, 'text-right')}>
												<span>
													<CurrencyConverter
														amount={cleaningPrice}
														from={currency}
													/>
												</span>
											</td>
										</tr>
									}
									<tr className={s.tableText}>
										<td className={cx(s.noBorder)}><FormattedMessage {...messages.serviceFee} /></td>
										<td className={cx(s.noBorder, 'text-right')}>
											<span>
												<CurrencyConverter
													amount={serviceFee}
													from={currency}
												/>
											</span>
										</td>
									</tr>
									{
										discount > 0 && <tr className={s.tableText}>
											<td className={cx(s.noBorder)}>{discountType}</td>
											<td className={cx(s.noBorder, 'text-right')}>
												- <span>
													<CurrencyConverter
														amount={discount}
														from={currency}
													/>
												</span>
											</td>
										</tr>
									}
								</tbody>
							</table>
						</Col>
					</Row>
				</div>
				<div className={cx(s.totalValue, s.space2)}>
					<Col xs={12} sm={12} md={12} lg={12}>
						<table className={cx('table')}>
							<tbody>
								<tr className={s.totalText}>
									<td className={cx(s.noBorder)}><FormattedMessage {...messages.total} /></td>
									<td className={cx(s.noBorder, 'text-right')}>
										<CurrencyConverter
											amount={subTotal}
											from={currency}
											superSymbol
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</Col>
				</div>
			</div>
		);
	}
}

export default injectIntl(withStyles(s)(PaymentDetails));
