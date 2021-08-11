import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Locale
import messages from '../../locale/messages';

class NoTransaction extends Component {
    static propTypes = {
        className: PropTypes.string,
        formatMessage: PropTypes.any,
    };

    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                <h3> <FormattedMessage {...messages.noTransactions} /></h3>
            </div>
        );
    }
}

export default NoTransaction;
