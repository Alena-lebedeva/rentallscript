import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { graphql, gql, compose } from 'react-apollo';

// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReservationManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Components
import Payout from './Payout';
import Refund from './Refund';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from './ModalForm';
import CustomPagination from '../../CustomPagination';

//graphql
import reservationsQuery from './reservationsQuery.graphql';

class ReservationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.any.isRequired,
      getTransactionHistory: PropTypes.shape({
        count: PropTypes.number.isRequired,
        reservationData: PropTypes.arrayOf(PropTypes.shape({
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
            payEmail: PropTypes.string.isRequired,
            methodId: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            last4Digits: PropTypes.number
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
            currency: PropTypes.string.isRequired,
            paymentMethodId: PropTypes.number
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
          }),
        })),
      }),
    }).isRequired,
    viewReceiptAdmin: PropTypes.any.isRequired,
  };

  static defaultProps = {
    data: {
      loading: true,
      getAllReservationAdmin: {
        count: null,
        reservationData: []
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    },
      this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }



  componentWillReceiveProps(nextProps) {
    const { data: { completed, loading } } = nextProps;
    const { searchList,currentPage  } = this.state;
    const { data: { refetch } } = this.props;
    let variables = { currentPage, searchList };
    if (completed && !loading) {
      refetch(variables);
    }
  }

  paginationData(currentPage) {
    const { data: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  handleClick(searchList) {
    const { data: { refetch } } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState({ currentPage: 1 });
    refetch(variables);
  }

  handleSearchChange = (e) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  render() {
    const { data, title, viewReceiptAdmin } = this.props;
    const { data: { getAllReservationAdmin, refetch } } = this.props;
    const { currentPage } = this.state;
    let userType = 'host';

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <ModalForm />
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={'table-responsive'}>
            {
              getAllReservationAdmin && getAllReservationAdmin.reservationData && getAllReservationAdmin.reservationData.length > 0 && <a
                href="/export-admin-data?type=reservations"
                className={cx('pull-right', s.exportLink)}
              >
                Export Data into CSV
              </a>
            }
            <div className={cx('col-md-4', s.seachContent)} >
              <FormControl
                type="text"
                placeholder={'Search'}
                onChange={(e) => this.handleSearchChange(e)}
              />
            </div>
            <Table className="table"
              noDataText="No matching records found."
              // filterable={['Code']}
              sortable={true}
            // itemsPerPage={20}
            >

              {
                getAllReservationAdmin && getAllReservationAdmin.reservationData && getAllReservationAdmin.reservationData.length > 0 && getAllReservationAdmin.reservationData.map(function (value, index) {
                  let subTotal = value.total + value.guestServiceFee;
                  return (
                    <Tr key={index}>
                      <Td column={"Reservation ID"} data={value.id} />
                      <Td column={"Code"}>
                        {value.confirmationCode}
                      </Td>
                      <Td column={"Status"} data={value.reservationState.toUpperCase()} />
                      {
                        value.listData && <Td column={"List Title"}>
                          <a href={"/rooms/" + value.listId} target='_blank'>
                            {value.listData.title}
                          </a>
                        </Td>
                      }
                      {
                        !value.listData && <Td column={"List Title"} data={"List is missing"} />
                      }
                      <Td column={"Refund to Guest"}>
                        <Refund
                          id={value.id}
                          reservationState={value.reservationState}
                          transactionData={value.transaction}
                          refundData={value.refundStatus}
                          cancelData={value.cancellationDetails}
                        />
                      </Td>
                      <Td column={"Sub Total"}>
                        <CurrencyConverter
                          amount={subTotal}
                          from={value.currency}
                        />
                      </Td>
                      <Td column={"Payout"}>
                        <Payout
                          hostId={value.hostId}
                          checkIn={value.checkIn}
                          id={value.id}
                          hostPayout={value.hostPayout}
                          amount={value.total}
                          currency={value.currency}
                          hostTransaction={value.hostTransaction}
                          reservationState={value.reservationState}
                          cancelData={value.cancellationDetails}
                          hostData={value.hostData}
                          hostServiceFee={value.hostServiceFee}
                        />
                      </Td>
                      <Td column={"Details"}>
                        <Link to={"/siteadmin/viewreservation/" + value.id} >
                          View
                      </Link>
                      </Td>

                    </Tr>
                  )
                })
              }
            </Table>
            {
              getAllReservationAdmin && getAllReservationAdmin.reservationData && getAllReservationAdmin.reservationData.length > 0
              && <div>
                <CustomPagination
                  total={getAllReservationAdmin.count}
                  currentPage={currentPage}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  change={this.paginationData}
                  paginationLabel={'Reservations'}
                />
              </div>
            }
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

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(reservationsQuery, {
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only',
    }
  })
)(ReservationManagement);
// export default withStyles(s)(connect(mapState, mapDispatch)(ReservationManagement));



