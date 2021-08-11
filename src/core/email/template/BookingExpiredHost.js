import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { sitename } from '../../../config';

class BookingExpiredHost extends Component {
	static propTypes = {
		content: PropTypes.shape({
			guestName: PropTypes.string.isRequired,
			hostName: PropTypes.string.isRequired,
			listTitle: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
		}).isRequired
	};

	render() {
		const textStyle = {
			color: '#484848',
			backgroundColor: '#F7F7F7',
			fontFamily: 'Arial',
			fontSize: '16px',
			padding: '35px',
		};

		const { content: { hostName, guestName, listTitle, confirmationCode, logo } } = this.props;
		return (
			<Layout>
				<Header color="#FF5A5F" backgroundColor="#F7F7F7" logo={logo} />
				<div>
					<Table width="100%" >
						<TBody>
							<TR>
								<TD style={textStyle}>
									<EmptySpace height={20} />
									<div>
										Hi {hostName},
								</div>
									<EmptySpace height={20} />
									<div>
										Your reservation ({confirmationCode}) from {guestName} at {listTitle} has expired.
									{' '}{guestName} will be fully refunded.
								</div>
									<EmptySpace height={40} />
									<div>
										Thanks, <br />
										The {sitename} Team
								</div>
								</TD>
							</TR>
						</TBody>
					</Table>
					<EmptySpace height={40} />
				</div>
				<Footer />
				<EmptySpace height={20} />
			</Layout>
		);
	}
}

export default BookingExpiredHost;
