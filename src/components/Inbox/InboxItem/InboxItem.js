import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import { graphql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

import {
	Row,
	Col,
	Label
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Inbox.css';

import logoUrl from '../logo-small.jpg';

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Redux Action
import { readMessage } from '../../../actions/message/readMessage';

// Locale
import messages from '../../../locale/messages';

// Graphql 
import GetAllThreadQuery from '../AllThreadsQuery.graphql';
class InboxItem extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		type: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		threadId: PropTypes.number.isRequired,
		profileId: PropTypes.number.isRequired,
		picture: PropTypes.string,
		displayName: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		sentBy: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		read: PropTypes.bool.isRequired,
		account: PropTypes.shape({
			userId: PropTypes.string.isRequired
		}),
		readMessage: PropTypes.any.isRequired
	};

	static defaultProps = {
		createdAt: null,
		startDate: null,
		endDate: null,
		picture: null,
		status: null,
		sentBy: null,
		read: false
	}

	label(status, noStyle) {
		let style, label;
		switch (status) {
			case 'inquiry':
				label = <FormattedMessage {...messages.messageStatus1} />
				style = 'info';
				break;
			case 'preApproved':
				label = <FormattedMessage {...messages.messageStatus2} />
				style = 'primary';
				break;
			case 'declined':
				label = <FormattedMessage {...messages.messageStatus3} />
				style = 'danger';
				break;
			case 'approved':
				label = <FormattedMessage {...messages.messageStatus4} />
				style = 'success';
				break;
			case 'pending':
				label = <FormattedMessage {...messages.messageStatus5} />
				style = 'warning';
				break;
			case 'cancelledByHost':
				label = <FormattedMessage {...messages.messageStatus6} />
				style = 'danger';
				break;
			case 'cancelledByGuest':
				label = <FormattedMessage {...messages.messageStatus7} />
				style = 'danger';
				break;
			case 'intantBooking':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'confirmed':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'expired':
				label = <FormattedMessage {...messages.messageStatus9} />
				style = 'danger';
				break;
			case 'requestToBook':
				label = <FormattedMessage {...messages.messageStatus10} />
				style = 'primary';
				break;
			case 'completed':
				label = <FormattedMessage {...messages.inboxCompleted} />
				style = 'success';
				break;
		}
		if (noStyle) {
			return label;
		}
		return <Label bsStyle={style}>{label}</Label>
	}

	render() {
		const { type, threadId, profileId, picture, displayName, content, createdAt, startDate, endDate } = this.props;
		const { city, state, country, status, sentBy, read } = this.props;
		const { formatMessage } = this.props.intl;
		const { account: { userId } } = this.props;
		const { readMessage } = this.props;
		let createdDate = createdAt != null ? moment(createdAt).format('MM/DD/YYYY') : '';
		let start = startDate != null ? '(' + moment(startDate).format('MM/DD/YYYY') : '';
		let end = endDate != null ? ' - ' + moment(endDate).format('MM/DD/YYYY') + ')' : '';
		let isRead;
		if (userId !== sentBy && read === false) {
			isRead = s.threadSubjectUnread;
		}

		return (
			<div className={s.PanelBody}>
				<Row>
					<Col xs={12} sm={12} md={12} lg={12} className={s.threadAuthor}>
						<div className={s.displayTable}>
							<div className={s.displayTableRow}>
								<div className={s.displayTableCellIcon}>
									<div className={s.threadAvatar}>
										<Avatar
											source={picture}
											height={70}
											width={70}
											title={displayName}
											className={s.profileAvatar}
											withLink
											linkClassName={s.profileAvatarLink}
											profileId={profileId}
										/>
									</div>
								</div>
								<div className={cx(s.displayTableCell, s.contentSection)}>
									<div className={s.displayTable}>
										<div className={s.displayTableRow}>
											<div className={cx(s.displayTableCell, s.nameWidth, s.displayBlock, s.paddingR20)}>
												<Link to={"/users/show/" + profileId}> {displayName}  </Link>
												<div>
													<time>{createdDate}</time>
												</div>
											</div>
											<div className={cx(s.displayTableCell, s.addressWidth, s.displayBlock)}>
												<Link
													to={"/message/" + threadId + "/" + type}
													className={cx(s.textMuted)}
													onClick={() => readMessage(threadId, type)}
												>
													<div className={cx(s.threadBody)}>
														<span className={cx(isRead)}>{content != null ? content : this.label(status, true)}</span>
														<div className={cx(s.textMuted)}>
															<span>{city}, {state}, {country} {start} {end}</span>
														</div>
													</div>
												</Link>
											</div>
											<div className={cx(s.displayTableCell, s.displayBlock, s.btnWidth)}>
												{this.label(status)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapState = (state) => ({
	account: state.account.data
});

const mapDispatch = {
	readMessage
};


export default compose(
	injectIntl,
	withStyles(s),
	connect(mapState, mapDispatch),
	graphql(GetAllThreadQuery, {
		name: 'GetAllThreads',
		options: {
			ssr: false,
			pollInterval: 5000,
			fetchPolicy: 'network-only',
		}
	})
)(InboxItem);
