import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { sitename } from '../../../config';

class BanStatusServiceStatusUnBanned extends React.Component {

	static propTypes = {
		content: PropTypes.shape({
			userMail: PropTypes.string.isRequired,
		}).isRequired
	};

	render() {
		const buttonStyle = {
			margin: 0,
			fontFamily: 'Arial',
			padding: '10px 16px',
			textDecoration: 'none',
			borderRadius: '2px',
			border: '1px solid',
			textAlign: 'center',
			verticalAlign: 'middle',
			fontWeight: 'normal',
			fontSize: '18px',
			whiteSpace: 'nowrap',
			background: '#ffffff',
			borderColor: '#ff5a5f',
			backgroundColor: '#ff5a5f',
			color: '#ffffff',
			borderTopWidth: '1px',
		};

		const linkText = {
			color: '#ff5a5f',
			fontSize: '16px',
			textDecoration: 'none',
			cursor: 'pointer',
		}

		const textStyle = {
			color: '#484848',
			backgroundColor: '#F7F7F7',
			fontFamily: 'Arial',
			fontSize: '16px',
			padding: '35px'
		};
		const { content: { userName, userMail, adminMail, logo } } = this.props;
		let mailTo = 'mailto:' + adminMail;

		return (
			<Layout>
				<Header color="#FF5A5F" backgroundColor="#F7F7F7" logo={logo} />
				<Body textStyle={textStyle}>
					<div>
						Dear {userName},
                    </div>
					<EmptySpace height={20} />
					<div>
						We have been activated your account and please login with your account. We did disable your account for violating our terms.
                    </div>
					<EmptySpace height={20} />
					<div>
						Please get in touch with <a href={mailTo}>us</a>, if you have any questions.
					</div>
					<EmptySpace height={40} />
					<div>
						Thanks, <br />
						The {sitename} Team
					</div>
				</Body>
				<Footer />
				<EmptySpace height={20} />
			</Layout>
		);
	}

}

export default BanStatusServiceStatusUnBanned;