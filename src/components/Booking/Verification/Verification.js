import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
	Button,
	Grid,
	Row,
	FormGroup,
	Col,
	FormControl
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Verification.css';
import envelope from './envelope.png';

// Locale
import messages from '../../../locale/messages';

class Verification extends Component {
	static propTypes = {
		guestEmail: PropTypes.string.isRequired,
		resendEmailVerification: PropTypes.any.isRequired,
		formatMessage: PropTypes.any,
	};

	render() {
		const { guestEmail, resendEmailVerification } = this.props;
		return (
			<Grid>
				<Row>
					<div className={s.pageContainer}>
						<div className={s.activationStepPanel}>
							<div className={s.panelBody}>
								<h3 className={s.space1}><span><FormattedMessage {...messages.checkEmail} /></span></h3>
								<div className={cx(s.textLead, s.space4)}>
									<div>
										<span><FormattedMessage {...messages.verificationInfo1} /></span>
									</div>
									<div>
										<span><FormattedMessage {...messages.verificationInfo2} /></span>
									</div>
								</div>
								<div className={cx(s.space4, s.spaceTop4)}>
									<div className={s.iconContainer}>
										<div className={s.space2}>
											<img
												src={envelope}
												className={cx(s.iconEnvelope, s.iconGray, s.iconSize)}
											/>
										</div>
									</div>
								</div>
								<Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
									<FormGroup className={s.formGroup}>
										<FormControl value={guestEmail} className={cx(s.formControlInput, s.textCenter)} disabled />
									</FormGroup>
								</Col>
								<Col xs={12} sm={12} md={12} lg={12}>
									<Button className={cx(s.button, s.btnPrimary)} onClick={resendEmailVerification}>
										<FormattedMessage {...messages.resendEmail} />
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

export default withStyles(s)(Verification);