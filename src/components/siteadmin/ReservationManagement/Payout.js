import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReservationManagement.css';

// Redux Action
import { openReservationModal } from '../../../actions/Reservation/payoutModal';
import { decode } from '../../../helpers/queryEncryption'

class Payout extends Component {
  static propTypes = {
    hostId: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    hostPayout: PropTypes.shape({
      id: PropTypes.number.isRequired,
      payEmail: PropTypes.string.isRequired,
      methodId: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      last4Digits: PropTypes.number
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
    transactionData: PropTypes.object,
    hostData: PropTypes.shape({
      userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
      })
    }),
    hostServiceFee: PropTypes.number
  };

  static defaultProps = {
    hostPayout: null,
    loading: false,
    completed: false,
    reservationId: 0,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { hostId, id, hostPayout, amount, currency, openReservationModal, reservationState, cancelData, hostServiceFee } = this.props;
    const { transactionData, hostData } = this.props;
    let hostServiceFeeAmount = hostServiceFee ? hostServiceFee : 0;
    let amountPaytoHost = amount - hostServiceFeeAmount;

    let amountCurrency = currency;
    let hostEmail;
    if (reservationState === 'cancelled' && cancelData) {
      amountPaytoHost = cancelData.payoutToHost;
      amountCurrency = cancelData.currency;
    }
    if (hostData && hostData.userData) {
      hostEmail = decode(hostData.userData.email);
    }
    const formName = 'ReservationPaymentForm';
    const initialData = {
      type: 'host',
      hostId,
      reservationId: id,
      receiverEmail: hostPayout.payEmail,
      payoutId: hostPayout.id,
      amount: amountPaytoHost,
      currency: amountCurrency,
      paymentMethodId: hostPayout.methodId,
      payoutCurrency: hostPayout.currency,
      last4Digits: hostPayout.last4Digits,
      hostEmail
    };
    openReservationModal(formName, initialData);
  }

  render() {
    const { checkIn, loading, reservationId, reservationState, completed, cancelData } = this.props;
    const { id, amount, currency, hostPayout, hostTransaction, openReservationModal } = this.props;

    let amountPaytoHost = 0;

    if (hostPayout === null || hostPayout.payEmail === undefined) {
      return <span>No Payout method</span>
    }
    if (cancelData) {
      amountPaytoHost = cancelData.payoutToHost;
    }
    if (reservationState === 'expired' || reservationState === 'declined' || (reservationState === 'cancelled' && amountPaytoHost === 0)) {
      return <span>Closed</span>
    }

    if (loading && reservationId === id) {
      return <span className={s.processingtext}>Processing...</span>;
    }

    if ((hostTransaction != null && hostTransaction.id != undefined) || (completed && reservationId === id)) {
      return <span>Completed</span>
    }

    let nextDay = moment(checkIn).add(1, 'days');
    let today = moment();
    let dayDifference = nextDay.diff(today, 'days');
    let status = 'Pending';
    let action = false;
    if ((dayDifference < 0 && hostPayout != null) || (reservationState === 'cancelled' && amountPaytoHost > 0)) {
      status = 'Ready To Pay';
      action = true;
    } else if (dayDifference < 0) {
      status = 'No Payout method';
    }

    return (
      <div>
        {
          action && <a onClick={this.handleClick}>
            {status}
          </a>
        }
        {
          !action && <span>{status}</span>
        }
      </div>
    );
  }
}


const mapState = (state) => ({
  loading: state.reservation.payoutLoading,
  reservationId: state.reservation.reservationId,
  completed: state.reservation.payoutCompleted
});

const mapDispatch = {
  openReservationModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(Payout));
