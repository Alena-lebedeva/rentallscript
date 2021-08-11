import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Policies.css';

// Component
import CancellationPolicy from '../../components/CancellationPolicies';

class Policies extends React.Component {
	static propTypes = {
		policyType: PropTypes.string.isRequired,
	};

	static defaultProps = {
		policyType: 'Flexible'
	};

	render() {
		const { policyType } = this.props;

		return (
			<div className={s.root}>
				<div className={s.container}>
					<CancellationPolicy policyType={policyType} />
				</div>
			</div>
		);
	}
}

export default withStyles(s)(Policies);