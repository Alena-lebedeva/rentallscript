import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
	Button,
	Grid,
	Row,
	Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Meetup.css';
import logoUrl from './home.png';

// Component
import Avatar from '../../Avatar';

// Locale
import messages from '../../../locale/messages';
class Meetup extends Component {
	static propTypes = {
		hostDisplayName: PropTypes.string.isRequired,
		hostPicture: PropTypes.string,
		guestDisplayName: PropTypes.string,
		guestPicture: PropTypes.string,
		nextPage: PropTypes.any.isRequired,
		emailVerified: PropTypes.bool.isRequired,
		formatMessage: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { nextPage, emailVerified, guestPicture } = this.props;

		if (guestPicture === null) {
			nextPage('avatar');
		} else if (emailVerified) {
			nextPage('payment');
		} else {
			nextPage('verification');
		}

	}

	render() {
		const { hostDisplayName, hostPicture, guestDisplayName } = this.props;

		return (
			<Grid>
				<Row>
					<div className={s.activationStepPanel}>
						<div className={s.panelBody}>
							<h2><span><FormattedMessage {...messages.meetupTitle} /> {hostDisplayName}</span></h2>
							<div className={cx(s.spaceTop5)}>
								<div className={s.userLeft}>
									<Avatar
										source={hostPicture}
										title={hostDisplayName}
										className={cx(s.profileImage, s.mediaPhoto, s.mediaRound)}
									/>
								</div>
								<div className={cx(s.userRight, s.logoIcon)}>
									<div className={cx(s.mediaRound, s.highlightedIcon)}>
										<img
											src={logoUrl}
											className={cx(s.logoImage, s.mediaPhoto, s.mediaRound)}
										/>
									</div>
								</div>
								<div className={s.userRight}>
									<Avatar
										isUser
										title={guestDisplayName}
										className={cx(s.profileImage, s.mediaPhoto, s.mediaRound)}
									/>
								</div>
								<p className={cx(s.space2, s.spaceTop2, s.textLead)}>
									<span><FormattedMessage {...messages.meetupInfo1} /></span>
								</p>
								<p className={cx(s.space4, s.textLead)}>
									<span><FormattedMessage {...messages.meetupInfo2} /></span>
								</p>
								<Col xs={12} sm={12} md={12} lg={12} className={s.space3}>
									<Button className={cx(s.button, s.btnPrimary)} onClick={this.handleClick}>
										<FormattedMessage {...messages.next} />
									</Button>
								</Col>
							</div>
						</div>
					</div>
				</Row>
			</Grid>
		);
	}
}

export default withStyles(s)(Meetup);