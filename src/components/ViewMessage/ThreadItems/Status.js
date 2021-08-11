import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

class Status extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    };

    static defaultProps = {
        type: null,
        createdAt: null
    };

    label(status) {
        switch (status) {
            case 'inquiry':
                return 'Inquiry';
            case 'preApproved':
                return 'Pre Approved';
            case 'declined':
                return 'Declined';
            case 'approved':
                return 'Approved';
            case 'pending':
                return 'Pending';
            case 'cancelledByHost':
                return 'Cancelled by host';
            case 'cancelledByGuest':
                return 'Cancelled by guest';
            case 'intantBooking':
                return 'Booking Confirmed';
            case 'confirmed':
                return 'Booking Confirmed';
            case 'expired':
                return 'Expired';
            case 'requestToBook':
                return 'Request to book';
            case 'completed':
                return 'Completed';
        }
    }

    render() {
        const { type, createdAt } = this.props;
        let date = createdAt != null ? moment(createdAt).format('MM/D/YYYY') : '';
        return (
            <div className={cx(s.inlineStatus, s.space5)}>
                <div className={cx(s.horizontalText)}>
                    <span className={s.textWrapper}>
                        <span>{this.label(type)}</span>
                        <span> {date}</span>
                    </span>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Status);

