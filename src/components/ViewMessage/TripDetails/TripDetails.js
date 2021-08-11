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
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

//Component
import PaymentDetails from './PaymentDetails';
import CancelDetails from './CancelDetails';

// Locale
import messages from '../../../locale/messages';

class TripDetails extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		listId: PropTypes.number.isRequired,
		userType: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		personCapacity: PropTypes.number.isRequired,
		basePrice: PropTypes.number.isRequired,
		cleaningPrice: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		cancelData: PropTypes.shape({
			guestServiceFee: PropTypes.number,
			hostServiceFee: PropTypes.number,
			refundToGuest: PropTypes.number,
			payoutToHost: PropTypes.number,
			total: PropTypes.number,
			currency: PropTypes.string,
		}),
		reservationData: PropTypes.any,
	};

	static defaultProps = {
		title: '',
		startDate: null,
		endDate: null,
		personCapacity: 0,
		reservationData: null
	};

	render() {
		const { title, startDate, endDate, personCapacity, listId, reservationData } = this.props;
		const { formatMessage } = this.props.intl;
		const { basePrice, cleaningPrice, weeklyDiscount, monthlyDiscount, userType, currency, cancelData } = this.props;
		let checkIn = startDate != null ? moment(startDate).format('ddd, Do MMM') : '';
		let checkOut = startDate != null ? moment(endDate).format('ddd, Do MMM') : '';

		let isCancelled = false;
		if (cancelData) {
			isCancelled = true;
		}
		return (
			<div className={cx(s.space4, s.spaceTop5, s.sidebarContainer)}>
				<div className={s.space4}>
					<h4><FormattedMessage {...messages.tripDetails} /></h4>
				</div>
				<div className={s.space4}>
					{/* <Link to={"/rooms/" + listId} className={s.timeText}> */}
					<a href={"/rooms/" + listId} target="_blank">
						<h4>{title}</h4>
					</a>
					{/* </Link> */}
				</div>
				<div className={s.space2}>
					<hr className={s.horizondalLine} />
					<Row className={cx(s.spaceTop3, s.space3)}>
						<Col xs={5} sm={5} className={s.noPaddingRight}>
							<div className={cx(s.textGray, s.space1)}>
								<span><FormattedMessage {...messages.checkIn} /></span>
							</div>
							<div className={s.checkInDate}>{checkIn}</div>
						</Col>
						<Col xs={1} sm={1}>
							<FontAwesome.FaChevronRight className={cx(s.textGray, s.chevronIcon)} />
						</Col>
						<Col xs={5} sm={5} className={cx(s.pullRight, s.textLeft)}>
							<div className={cx(s.textGray, s.space1)}>
								<span><FormattedMessage {...messages.checkOut} /></span>
							</div>
							<div className={s.checkInDate}>{checkOut}</div>
						</Col>
					</Row>
					<hr className={s.horizondalLine} />
				</div>
				<div className={s.space2}>
					<div className={cx(s.textGray, s.space1)}>
						<span><FormattedMessage {...messages.guests} /></span>
					</div>
					<div className={s.space3}>
						<span>{personCapacity} {personCapacity > 1 ? formatMessage(messages.guestsCapcity) : formatMessage(messages.guestCapcity)}</span>
					</div>
					<hr className={s.horizondalLine} />
					{
						!isCancelled && reservationData && <PaymentDetails
							userType={userType}
							startDate={startDate}
							endDate={endDate}
							basePrice={basePrice}
							cleaningPrice={cleaningPrice}
							weeklyDiscount={weeklyDiscount}
							monthlyDiscount={monthlyDiscount}
							currency={currency}
							reservationData={reservationData}
						/>
					}

					{
						isCancelled && <CancelDetails
							userType={userType}
							cancelData={cancelData}
							reservationData={reservationData}
						/>
					}

				</div>
			</div>
		);
	}
}

export default injectIntl(withStyles(s)(TripDetails));

