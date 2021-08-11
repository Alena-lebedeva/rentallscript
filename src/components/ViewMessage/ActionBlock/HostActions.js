import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

import {
	Button,
	Col,
	Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux action
import { sendMessageAction } from '../../../actions/message/sendMessageAction';

// Component
import CountDown from '../../CountDown';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class HostActions extends Component {
	static propTypes = {
		actionType: PropTypes.string.isRequired,
		sendMessageAction: PropTypes.any.isRequired,
		threadId: PropTypes.number.isRequired,
		reservationId: PropTypes.number,
		threadType: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		personCapacity: PropTypes.number.isRequired,
		guestDisplayName: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		hostDisplayName: PropTypes.string.isRequired,
	};

	async sendMessage(type) {
		const { sendMessageAction, threadId, threadType, startDate, endDate, personCapacity, reservationId } = this.props;

		sendMessageAction(threadId, threadType, null, type, startDate, endDate, personCapacity, reservationId, null, null, null, null);		
	}

	// Inquiry
	inquiry(guestDisplayName) {
		const { createdAt } = this.props;
		let startDate = moment();
		let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
		let distance = next24Hours - startDate;
		let options = { endDate: next24Hours };
		return (
			<Panel className={cx(s.space5, s.contextPadding)}>
				<h4>
					<strong><FormattedMessage {...messages.hostAction1} /> {guestDisplayName} <FormattedMessage {...messages.hostAction2} /></strong>
				</h4>
				<p className={s.spaceTop2}><FormattedMessage {...messages.hostAction3} /> {guestDisplayName} <FormattedMessage {...messages.hostAction4} /></p>
				{
					distance > 0 && <p className={s.spaceTop2}>
						<FontAwesome.FaClockO className={cx(s.textGray, s.timerIcon)} />
						<FormattedMessage {...messages.hostResponseTime1} /> <CountDown options={options} /> <FormattedMessage {...messages.hostResponseTime2} />
					</p>
				}
				<Col md={12} className={cx(s.spaceTop2, s.noPadding)}>
					<Button className={s.btnPrimary} onClick={() => this.sendMessage('preApproved')}>
						<FormattedMessage {...messages.preApprove} />
					</Button>
					{/* <Button className={cx(s.btnPrimaryBorder, s.btnRight)} onClick={() => this.sendMessage('declined')}>
						<FormattedMessage {...messages.decline} />
					</Button> */}
				</Col>
			</Panel>
		);
	}

	// Request to book
	requestToBook(guestDisplayName) {
		const { createdAt, listPublishStatus } = this.props;
		let startDate = moment();
		//let next24Hours = moment(createdAt).add(24, 'hours');
		let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
		let distance = next24Hours - startDate;
		let options = { endDate: next24Hours };

		return (
			<Panel className={cx(s.space5, s.contextPadding)}>
				<h4><strong>{guestDisplayName} <FormattedMessage {...messages.guestRequest} /></strong></h4>
				{
					distance > 0 && <p className={s.spaceTop2}>
						<FormattedMessage {...messages.hostResponseTime1} /> <CountDown options={options} /> <FormattedMessage {...messages.hostResponseTime2} />
					</p>
				}
				{
					listPublishStatus && <Col md={12} className={cx(s.spaceTop2, s.noPadding)}>
						<Button className={s.btnPrimary} onClick={() => this.sendMessage('approved')}>
							<FormattedMessage {...messages.approve} />
						</Button>
						<Button className={cx(s.btnPrimaryBorder, s.btnRight)} onClick={() => this.sendMessage('declined')}>
							<FormattedMessage {...messages.decline} />
						</Button>
					</Col>
				}
			</Panel>
		);
	}

	// Inquiry pre-approved
	approved() {
		return (
			<Panel className={cx(s.space5, s.contextPadding)}>
				<h4><strong><FormattedMessage {...messages.requestApproved} /></strong></h4>
				<p className={s.spaceTop2}>
					<FormattedMessage {...messages.timeToExpire} />
				</p>
			</Panel>
		);
	}

	// Request to book/ Inquiry declined
	declined() {
		return (
			<Panel className={cx(s.space5, s.contextPadding)}>
				<h4><strong><FormattedMessage {...messages.requestDeclined} /></strong></h4>
				<p className={s.spaceTop2}>
					<FormattedMessage {...messages.declinedInfo} />
				</p>
			</Panel>
		);
	}

	// Booking confirmed by host/ instant booking
	bookingConfirmed() {
		const { reservationId } = this.props;
		return (
			<Panel className={cx(s.space5, s.contextPadding)}>
				<h4><strong><FormattedMessage {...messages.bookingIsConfirmed} /></strong></h4>
				<p className={s.spaceTop2}>
					<FormattedMessage {...messages.contactGuest} />
				</p>
				<Col md={12} className={cx(s.spaceTop2, s.noPadding)}>
					<Link to={"/cancel/" + reservationId + "/host"} className={cx(s.linkBtn, s.btnPrimary)}>
						<FormattedMessage {...messages.cancelReservation} />
					</Link>
				</Col>
			</Panel>
		);
	}

	// Pre-approved or approved by host is expired
	expired(guestDisplayName) {
		return (
			<Panel className={cx(s.space5, s.contextPadding)}>
				<h4><strong><FormattedMessage {...messages.bookingIsExpired} /></strong></h4>
				<p className={s.spaceTop2}>
					{guestDisplayName}'s <FormattedMessage {...messages.bookingIsExpired1} />
				</p>
			</Panel>
		);
	}

	// Booking is cancelled by host
	cancelled(guestDisplayName) {
		return (
			<Panel className={cx(s.space5, s.contextPadding)}>
				<h4><strong><FormattedMessage {...messages.bookingRequestCancel1} /></strong></h4>
				<p className={s.spaceTop2}>
					{guestDisplayName}'s <FormattedMessage {...messages.bookingRequestCancel3} />
				</p>
			</Panel>
		);
	}

	completed() {
		return (
			<Panel className={cx(s.space5, s.contextPadding)}>
				<h4><strong><FormattedMessage {...messages.reservationIsCompleted} /></strong></h4>
				<p className={s.spaceTop2}>
					<FormattedMessage {...messages.reservationIsCompletedDescription} />
                </p>
			</Panel>
		);
	}

	render() {
		const { actionType, guestDisplayName } = this.props;
		if (actionType === 'inquiry') {
			return this.inquiry(guestDisplayName);
		} else if (actionType === 'preApproved') {
			return this.approved();
		} else if (actionType === 'declined') {
			return this.declined();
		} else if (actionType === 'intantBooking' || actionType === 'approved') {
			return this.bookingConfirmed();
		} else if (actionType === 'requestToBook') {
			return this.requestToBook(guestDisplayName);
		} else if (actionType === 'expired') {
			return this.expired(guestDisplayName);
		} else if (actionType === 'cancelledByHost' || actionType === 'cancelledByGuest') {
			return this.cancelled(guestDisplayName);
		} else if (actionType === 'completed') {
			return this.completed();
		}

	}
}

const mapState = (state) => ({
});

const mapDispatch = {
	sendMessageAction,
};

export default withStyles(s)(connect(mapState, mapDispatch)(HostActions));