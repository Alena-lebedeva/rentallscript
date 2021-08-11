import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancel.css';

// Component
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';
import Cancellation from '../../components/Cancellation';

// Graphql
import CancelQuery from './Cancel.graphql';

class Cancel extends React.Component {
	static propTypes = {
		reservationId: PropTypes.number.isRequired,
		userType: PropTypes.string.isRequired,
		cancellationData: PropTypes.shape({
			loading: PropTypes.bool,
			cancelReservationData: PropTypes.object
		}).isRequired
	};

	static defaultProps = {
		cancellationData: {
			loading: true
		}
	};

	render() {
		const { cancellationData: { loading, cancelReservationData }, userType } = this.props;

		if (loading) {
			return (
				<div className={s.space4}>
					<Loader type="text" />
				</div>
			);
		}

		if (cancelReservationData === null || cancelReservationData === undefined) {
			return <NotFound />;
		}

		return (
			<div className={s.root}>
				<div className={s.container}>
					<Cancellation userType={userType} data={cancelReservationData} />
				</div>
			</div>
		);
	}
}

export default compose(
	withStyles(s),
	graphql(CancelQuery,
		{
			name: 'cancellationData',
			options: (props) => ({
				variables: {
					reservationId: props.reservationId,
					userType: props.userType
				},
				fetchPolicy: 'network-only',
			})
		}
	),
)(Cancel);