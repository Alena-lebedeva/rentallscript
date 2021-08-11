import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForm.css';
import {
  Modal
} from 'react-bootstrap';

import PaymentForm from './PaymentForm';

import { closeReservationModal } from '../../../../actions/Reservation/payoutModal';

class ModalForm extends Component {
  static propTypes = {
    closeReservationModal: PropTypes.any.isRequired,
    reservationModal: PropTypes.bool
  };

  static defaultProps = {
    reservationModal: false
  };

  render() {
    const { closeReservationModal, reservationModal } = this.props;
    return (
      <div>
        <Modal show={reservationModal} onHide={closeReservationModal} dialogClassName={s.logInModalContainer} >
          <Modal.Header closeButton>
            <Modal.Title>Payout/Refund</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <PaymentForm />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
  reservationModal: state.reservation.reservationModal,
});

const mapDispatch = {
  closeReservationModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ModalForm));
