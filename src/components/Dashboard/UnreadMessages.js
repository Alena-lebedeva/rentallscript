import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
	Row,
	Col,
	Panel,
	Label
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inbox.css';

//Components
import InboxItem from './InboxItem';
import Loader from '../Loader';

// Locale
import messages from '../../locale/messages';
class UnreadMessages extends React.Component {

	static propTypes = {
		formatMessage: PropTypes.any,
		userId: PropTypes.string.isRequired,
		loading: PropTypes.bool.isRequired,
		getUnreadThreads: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			listData: PropTypes.shape({
				city: PropTypes.string.isRequired,
				state: PropTypes.string.isRequired,
				country: PropTypes.string.isRequired,
			}),
			guestProfile: PropTypes.shape({
				profileId: PropTypes.number.isRequired,
				picture: PropTypes.string,
				displayName: PropTypes.string.isRequired,
			}),
			hostProfile: PropTypes.shape({
				profileId: PropTypes.number.isRequired,
				picture: PropTypes.string,
				displayName: PropTypes.string.isRequired,
			}),
			threadItemUnread: PropTypes.shape({
				type: PropTypes.string.isRequired,
				content: PropTypes.string,
				startDate: PropTypes.string,
				endDate: PropTypes.string,
				isRead: PropTypes.bool.isRequired,
				sentBy: PropTypes.string.isRequired,
				createdAt: PropTypes.string.isRequired,
			}),
		}))
	};

	static defaultProps = {
		loading: true,
		getUnreadThreads: []
	};

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
				label = 'Completed';
				style = 'success';
				break;
		}
		if (noStyle) {
			return label;
		}
		return <Label bsStyle={style}>{label}</Label>
	}

	render() {
		const { loading, getUnreadThreads, userId } = this.props;

		if (loading) {
			return <Loader type={"text"} />
		} else {
			if (getUnreadThreads != null && getUnreadThreads.length > 0) {
				return (
					<div className={cx(s.progressContainerResponsive, s.space5, s.spaceTop5)}>
						<Row>
							<Col xs={12} sm={12} md={12} lg={12}>
								{
									<Panel className={cx("dashboardMessage", s.panelHeader)}>
										<ul className={s.listLayout}>
											{
												getUnreadThreads.map((item, index) => {
													let type;
													if (userId === item.host) {
														type = 'host';
													} else {
														type = 'guest';
													}
													if (item.threadItemUnread != null && item.guestProfile && item.hostProfile) {
														return <InboxItem
															key={index}
															threadId={item.id}
															type={type}
															profileId={type === 'host' ? item.guestProfile.profileId : item.hostProfile.profileId}
															picture={type === 'host' ? item.guestProfile.picture : item.hostProfile.picture}
															displayName={type === 'host' ? item.guestProfile.displayName : item.hostProfile.displayName}
															content={item.threadItemUnread.content != null ? item.threadItemUnread.content : this.label(item.threadItemUnread.type, true)}
															createdAt={item.threadItemUnread.createdAt}
															city={item.listData.city}
															state={item.listData.state}
															country={item.listData.country}
															startDate={item.threadItemUnread.startDate}
															endDate={item.threadItemUnread.endDate}
															status={this.label(item.threadItemUnread.type)}
															sentBy={item.threadItemUnread.sentBy}
															read={item.threadItemUnread.isRead}
														/>
													} else {
														return <li />
													}
												})
											}
										</ul>
									</Panel>
								}
							</Col>
						</Row>
					</div>
				);
			} else {
				return <div />
			}
		}
	}
}

export default withStyles(s)(UnreadMessages);

