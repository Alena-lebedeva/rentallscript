import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Locale
import messages from '../../../locale/messages';

class CompletedTransactionPayout extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		data: PropTypes.shape({
			amount: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
			createdAt: PropTypes.string.isRequired,
			payoutEmail: PropTypes.string.isRequired,
			formatMessage: PropTypes.any,
		})
	};

	render() {
		const { className, data } = this.props;
		let date = data.createdAt != null ? moment(data.createdAt).format('DD-MM-YYYY') : '';
		//let totalAmount = Number(data.total) - Number(data.hostServiceFee);

		return (
			<tr>
				<td className={className}>{date}</td>
				<td className={className}><FormattedMessage {...messages.transactionPayout} /></td>
				<td className={className}><FormattedMessage {...messages.transferTo} /> {data.payoutEmail}</td>
				<td className={className} />
				<td className={className}>
					<CurrencyConverter
						amount={data.amount}
						from={data.currency}
					/>
				</td>
			</tr>
		);
	}
}

export default CompletedTransactionPayout;
