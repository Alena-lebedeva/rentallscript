import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewReservation.css';
import moment from 'moment';
import CurrencyConverter from '../../CurrencyConverter';


class HostServiceFee extends Component {
    static propTypes = {
        hostId: PropTypes.string.isRequired,
        checkIn: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        hostPayout: PropTypes.shape({
            id: PropTypes.number.isRequired,
            payEmail: PropTypes.string.isRequired
        }),
        hostTransaction: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
        loading: PropTypes.bool,
        reservationId: PropTypes.number,
        reservationState: PropTypes.string.isRequired,
        completed: PropTypes.bool,
        openReservationModal: PropTypes.any.isRequired,
        cancelData: PropTypes.shape({
            payoutToHost: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
        }),
    };

    static defaultProps = {
        hostPayout: null,
        loading: false,
        completed: false,
        reservationId: 0,
    };




    render() {
        const { checkIn, loading, reservationId, reservationState, completed, cancelData, hostServiceFee } = this.props;
        const { id, amount, currency, hostPayout, hostTransaction } = this.props;
        let amountPaytoHost = 0;

        if (hostPayout === null || hostPayout.payEmail === undefined) {
            return <span> <CurrencyConverter amount={0}
                from={currency} />  </span>
        }
        if (cancelData) {
            amountPaytoHost = cancelData.payoutToHost;
        }
        if (reservationState === 'expired' || reservationState === 'declined' || (reservationState === 'cancelled' && amountPaytoHost === 0)) {
            return <span> <CurrencyConverter amount={0}
                from={currency} />  </span>
        }



        if ((hostTransaction != null && hostTransaction.id != undefined) || (reservationId === id)) {
            return <span> <CurrencyConverter amount={hostServiceFee}
                from={currency} /></span>
        }

        let nextDay = moment(checkIn).add(1, 'days');
        let today = moment();
        let dayDifference = nextDay.diff(today, 'days');
        let status = { hostServiceFee };
        let action = false;
        if ((dayDifference < 0 && hostPayout != null) || (reservationState === 'cancelled' && amountPaytoHost > 0)) {
            status = { hostServiceFee }
            action = true;
        } else if (dayDifference < 0) {
            status = 0;
        }

        return (
            <span> <CurrencyConverter amount={hostServiceFee}
                from={currency} /></span>
        );
    }
}




export default withStyles(s)(HostServiceFee);
