import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
    Table
} from 'react-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewReservation.css';
// Components
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from '../ReservationManagement/ModalForm';
// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';
import HostServiceFee from './HostServiceFee';
import { decode } from '../../../helpers/queryEncryption';
class ViewReservation extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            reservationState: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                title: PropTypes.string.isRequired
            }),
            hostData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            hostPayout: PropTypes.shape({
                id: PropTypes.number.isRequired,
                payEmail: PropTypes.string.isRequired
            }),
            hostTransaction: PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
            guestData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            transaction: PropTypes.shape({
                payerEmail: PropTypes.string.isRequired,
                paymentType: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            cancellationDetails: PropTypes.shape({
                refundToGuest: PropTypes.number.isRequired,
                payoutToHost: PropTypes.number.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired,
                guestServiceFee: PropTypes.number.isRequired,
                hostServiceFee: PropTypes.number.isRequired,
                cancellationPolicy: PropTypes.string,
                cancelledBy: PropTypes.string,
            }),
        }),
        viewReceiptAdmin: PropTypes.any.isRequired,
    };
    static defaultProps = {
        data: []
    };
    componentWillReceiveProps(nextProps) {
        const { completed, loading } = nextProps;
        const { refetch } = this.props;
        if (completed && !loading) {
            refetch();
        }
    }
    render() {
        const { title, data, data: { listData, cancellationDetails, transaction } } = this.props;
        let subTotal;
        if (data) {
            subTotal = data.total + data.guestServiceFee;
        }
        let amountPaytoGuest = 0;
        let amountPaytoHost = 0;
        let guestFee = 0;
        if (cancellationDetails) {
            amountPaytoGuest = cancellationDetails.refundToGuest;
            amountPaytoHost = cancellationDetails.payoutToHost;
            guestFee = cancellationDetails.guestServiceFee;
        } else if (data) {
            amountPaytoHost = Number(data.total) - Number(data.hostServiceFee);
            guestFee = data.guestServiceFee;
        }

        if (data && (data.reservationState == 'expired' || data.reservationState == 'declined')) {
            guestFee = 0;
        }
        let nextDay = moment(data.checkIn).add(1, 'days');
        let today = moment();
        let dayDifference = nextDay.diff(today, 'days');

        let booktype, reservestate;
        if (data) {
            reservestate = data.reservationState;
        }
        if (listData) {
            booktype = listData.bookingType;
        }
        let Guestname, Hostname, reservationStatus, bookingType;
        if (data && data.guestData) {
            Guestname = data.guestData.firstName + " " + data.guestData.lastName;
        }
        if (data && data.hostData) {
            Hostname = data.hostData.firstName + " " + data.hostData.lastName;

        }
        if (reservestate) {
            reservationStatus = reservestate.charAt(0).toUpperCase() + reservestate.slice(1);
        }
        if (booktype) {
            bookingType = booktype.charAt(0).toUpperCase() + booktype.slice(1);
        }
        const gobackcss = { padding: '10px' };
        return (
            <div className={cx(s.pagecontentWrapper)}>
                <ModalForm />
                <div className={s.contentBox}>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={'table-responsive'}>
                        <Link to={"/siteadmin/reservations"} className={cx('pull-right')} style={gobackcss}>
                            Go back
                        </Link>
                        <Table >
                            <tbody>
                                {
                                    data && data.id && <tr>
                                        <td>  Reservation Id   </td>
                                        <td>  {data.id}  </td>
                                    </tr>
                                }
                                {
                                    data && data.confirmationCode && <tr>
                                        <td>  Confirmation Code   </td>
                                        <td>  {data.confirmationCode}  </td>
                                    </tr>
                                }
                                {
                                    reservationStatus && <tr>
                                        <td>  Reservation Status   </td>
                                        <td>  {reservationStatus}  </td>
                                    </tr>
                                }
                                {
                                    data && data.cancellationDetails && data.cancellationDetails.cancellationPolicy && <tr>
                                        <td>  Cancellation Policy   </td>
                                        <td>  {data.cancellationDetails.cancellationPolicy}  </td>
                                    </tr>
                                }
                                {
                                    data && data.cancellationDetails && data.cancellationDetails.cancelledBy && <tr>
                                        <td>  Cancelled By   </td>
                                        <td className={s.capitalize}>  {data.cancellationDetails.cancelledBy}  </td>
                                    </tr>
                                }
                                {
                                    data && data.listData && data.listData.id && data.listData.title && <tr>
                                        <td>  Listing Title   </td>
                                        <td>  <a href={"/rooms/" + data.listData.id} target="_blank"> {data.listData.title}  </a>  </td>
                                    </tr>
                                }
                                {
                                    data && data.checkIn && <tr>
                                        <td>  Checkin   </td>
                                        <td>  {moment(data.checkIn).format("Do MMMM YYYY")}  </td>
                                    </tr>
                                }
                                {
                                    data && data.checkOut && <tr>
                                        <td>  Checkout   </td>
                                        <td>  {moment(data.checkOut).format("Do MMMM YYYY")}  </td>
                                    </tr>
                                }
                                {
                                    bookingType && <tr>
                                        <td>  Booking Type   </td>
                                        <td>  {bookingType}  </td>
                                    </tr>
                                }
                                {
                                    data && (subTotal == 0 || subTotal > 0) && <tr>
                                        <td>  Amount Paid   </td>
                                        <td>  <CurrencyConverter amount={subTotal} from={data.currency} />  </td>
                                    </tr>
                                }
                                {/* {
                                    data && (data.guestServiceFee == 0 || data.guestServiceFee > 0) && !cancellationDetails && <tr>
                                        <td>  Guest Service Fee   </td>
                                        <td>  <CurrencyConverter amount={data.guestServiceFee} from={data.currency} />  </td>
                                    </tr>
                                } */}

                                <tr>
                                    <td>  Guest Service Fee   </td>
                                    <td>  <CurrencyConverter amount={guestFee} from={data.currency} />  </td>
                                </tr>
                                {
                                    data && <tr>
                                        <td>  Host Service Fee   </td>
                                        <td>  <HostServiceFee
                                            hostId={data.hostId}
                                            checkIn={data.checkIn}
                                            id={data.id}
                                            hostPayout={data.hostPayout}
                                            amount={data.total}
                                            currency={data.currency}
                                            hostTransaction={data.hostTransaction}
                                            reservationState={data.reservationState}
                                            cancelData={data.cancellationDetails}
                                            hostServiceFee={data.hostServiceFee}
                                        /> </td>
                                    </tr>
                                }
                                {
                                    data && data.guestData && data.guestData.profileId && Guestname && <tr>
                                        <td>  Guest Name   </td>
                                        <td>  <a href={"/users/show/" + data.guestData.profileId} target="_blank"> {Guestname}   </a>  </td>
                                    </tr>
                                }
                                {
                                    data && data.guestData && data.guestData.phoneNumber && <tr>
                                        <td>  Guest Phone Number   </td>
                                        <td>  {decode(data.guestData.phoneNumber)}  </td>
                                    </tr>
                                }
                                {
                                    data && data.guestUser && data.guestUser.email && <tr>
                                        <td>  Guest Email   </td>
                                        <td>  {data.guestUser.email}  </td>
                                    </tr>
                                }
                                {
                                    data && data.hostData && data.hostData.profileId && Hostname && <tr>
                                        <td>  Host Name   </td>
                                        <td>  <a href={"/users/show/" + data.hostData.profileId} target="_blank"> {Hostname}   </a> </td>
                                    </tr>
                                }
                                {
                                    data && data.hostData && data.hostData.phoneNumber && <tr>
                                        <td>  Host Phone Number   </td>
                                        <td>  {decode(data.hostData.phoneNumber)} </td>
                                    </tr>
                                }
                                {
                                    data && data.hostUser && data.hostUser.email && <tr>
                                        <td>  Host Email   </td>
                                        <td>  {data.hostUser.email} </td>
                                    </tr>
                                }
                                {
                                    data && data.cancellationDetails && data.cancellationDetails.createdAt && <tr>
                                        <td>  Cancel Date   </td>
                                        <td>  {moment(data.cancellationDetails.createdAt).format("Do MMMM YYYY")}  </td>
                                    </tr>
                                }
                                {
                                    data && cancellationDetails && (cancellationDetails.refundToGuest == 0 || cancellationDetails.refundToGuest > 0) && <tr>
                                        <td> Refund Amount  </td>
                                        <td>  <CurrencyConverter amount={cancellationDetails.refundToGuest}
                                            from={data.currency} />  </td>
                                    </tr>
                                }
                                {
                                    data && !cancellationDetails && (data.reservationState == 'expired' || data.reservationState == 'declined') && <tr>
                                        <td> Refund Amount  </td>
                                        <td>  <CurrencyConverter amount={subTotal}
                                            from={data.currency} />  </td>
                                    </tr>
                                }
                                {
                                    data && (data.reservationState == 'approved' || data.reservationState == 'completed' || data.reservationState == 'cancelled') && <tr>
                                        <td> Payout Amount  </td>
                                        <td>  <CurrencyConverter amount={amountPaytoHost}
                                            from={data.currency} />  </td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }

}
const mapState = (state) => ({
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});
const mapDispatch = {
    viewReceiptAdmin,
};
export default withStyles(s)(connect(mapState, mapDispatch)(ViewReservation));



