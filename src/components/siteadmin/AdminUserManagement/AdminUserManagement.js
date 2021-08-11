import React from 'react';

import { Table, Tr, Td } from 'reactable';
import { connect } from 'react-redux';
import {
  Button,
  Col
} from 'react-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminUserManagement.css';

// Redux Actions
import { openAdminUserModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

// Components
import AdminUserModal from '../AdminUserModal';
import Link from '../../Link';

class AdminUserManagement extends React.Component {

  static defaultProps = {
    data: [],
    roles: []
  };

  render() {
    const { data, title, openAdminUserModal, deleteAdminUser, roles } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <AdminUserModal roles={roles} />
          <Col xs={12} sm={3} md={3} lg={3} className={cx(s.noPadding, s.buttonMargin)}>
            <Button
              className={cx(s.button, s.btnPrimary, s.marginBottom20)} 
              onClick={() => openAdminUserModal('add')}>
              Add New
            </Button>
          </Col>
          <div className={'table-responsive'}>
            <Table
              className="table"
              noDataText="No matching records found."
            >
              {
                data && data.length > 0 && data.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td column={"S.No"} data={key+1} />
                      <Td column={"Email"} data={value.email} />
                      <Td column={"Admin Role"} data={value.adminRole && value.adminRole.name} />
                      <Td column={"Edit"}>
                        <Link noLink onClick={() => openAdminUserModal('edit', value)}>Edit</Link>
                      </Td>
                      <Td column={"Delete"}>
                        <Link noLink onClick={() => deleteAdminUser(value.id)}>Delete</Link>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  openAdminUserModal,
  deleteAdminUser
};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminUserManagement));

