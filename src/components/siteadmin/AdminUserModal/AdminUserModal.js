// General
import React, { Component } from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminUserModal.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeAdminUserModal } from '../../../actions/siteadmin/modalActions';

// Component
import AdminUserForm from '../AdminUserForm';


class AdminUserModal extends Component {
  static defaultProps = {
    adminUserModalType: 'add'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeAdminUserModal, adminUserModal, adminUserModalType, roles } = this.props;

    return (
      <div>
        <Modal show={adminUserModal} onHide={closeAdminUserModal}>
          <Modal.Header closeButton>
            <Modal.Title>{adminUserModalType == 'add' ? 'Add' : 'Edit'} Admin User</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <AdminUserForm roles={roles} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  adminUserModal: state.adminModalStatus.adminUserModal,
  adminUserModalType: state.adminModalStatus.adminUserModalType
});

const mapDispatch = {
  closeAdminUserModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminUserModal));
