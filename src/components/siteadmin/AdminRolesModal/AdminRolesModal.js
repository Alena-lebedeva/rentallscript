// General
import React, { Component } from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AdminRolesModal.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeAdminRolesModal } from '../../../actions/siteadmin/modalActions';

// Component
import AdminRolesForm from '../AdminRolesForm';


class AdminRolesModal extends Component {
  static defaultProps = {
    adminRolesModalType: 'add'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeAdminRolesModal, adminRolesModal, adminRolesModalType } = this.props;

    return (
      <div>
        <Modal show={adminRolesModal} onHide={closeAdminRolesModal}>
          <Modal.Header closeButton>
            <Modal.Title>{adminRolesModalType == 'add' ? 'Add' : 'Edit'} Admin Role</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <AdminRolesForm />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  adminRolesModal: state.adminModalStatus.adminRolesModal,
  adminRolesModalType: state.adminModalStatus.adminRolesModalType
});

const mapDispatch = {
  closeAdminRolesModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminRolesModal));
