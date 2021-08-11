import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
	Button,
	Grid,
	Row,
	Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AvatarUpload.css';
import { graphql, gql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

// Component
import Avatar from '../../Avatar';
import DropZone from './DropZone';
import Loader from '../../Loader';

// Locale
import messages from '../../../locale/messages';

class AvatarUpload extends Component {
	static propTypes = {
		profilePhotoLoading: PropTypes.bool,
		guestPicture: PropTypes.string,
		guestDisplayName: PropTypes.string.isRequired,
		nextPage: PropTypes.any.isRequired,
		emailVerified: PropTypes.bool.isRequired,
		formatMessage: PropTypes.any,
	};

	static defaultProps = {
		profilePictureData: {
			loading: true
		},
		profilePhotoLoading: false
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { nextPage, emailVerified } = this.props;
		if (emailVerified) {
			nextPage('payment');
		} else {
			nextPage('verification');
		}
	}

	render() {
		const { profilePictureData: { loading, userAccount }, guestPicture, guestDisplayName, profilePhotoLoading } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<Grid>
				<Row>
					<div className={s.pageContainer}>
						<div className={s.activationStepPanel}>
							<div className={s.panelBody}>
								<h3 className={s.space1}>
									<span><FormattedMessage {...messages.addProfilePhoto} /></span>
								</h3>
								<div className={cx(s.textLead, s.space4)}>
									<div>
										<span>
											<FormattedMessage {...messages.uploadInfo} />
										</span>
									</div>
								</div>
								<Loader
									show={profilePhotoLoading}
									type={"page"}
								>
									<div className={cx(s.space4, s.spaceTop4)}>
										<div className={s.space2}>
											{
												loading ? 'Loading...' : <Avatar
													isUser
													title={guestDisplayName}
													className={cx(s.profileImage, s.mediaPhoto, s.mediaRound)}
												/>
											}
										</div>
									</div>
								</Loader>
								<Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.fullWidth, s.button, s.btnPrimaryBorder, s.btnlarge, s.noPadding)}>
									<DropZone
										guestPicture={guestPicture}
										defaultMessage={formatMessage(messages.dropzoneUpload)}
									/>

								</Col>
								<Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.spaceTop2)}>
									{
										guestPicture && <Button
											className={cx(s.button, s.btnPrimary)}
											onClick={this.handleClick}
										>
											<FormattedMessage {...messages.continue} />
										</Button>
									}

								</Col>
							</div>
						</div>
					</div>
				</Row>
			</Grid>
		);
	}
}
const mapState = (state) => ({
	profilePhotoLoading: state.account.profilePhotoLoading
});

const mapDispatch = {};

export default compose(
	injectIntl,
	withStyles(s),
	connect(mapState, mapDispatch),
	graphql(gql`
		query {
			userAccount {
				picture
			}
		}
	  `, {
			name: 'profilePictureData',
			options: {
				ssr: false
			}
		}),
)(AvatarUpload);